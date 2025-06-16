import * as XLSX from "xlsx";
import ExtractedSeance from "../types/extractedSeance";

// Type for the day mappings
type DayMappings = {
  [day: string]: string[];
};

// Type for the time mappings
type TimeMappings = {
  [time: string]: string[];
};

// Type for the callback function
type ReadExcelCallback = (seances: ExtractedSeance[]) => void;

const readExcelFile = (file: File, callback?: ReadExcelCallback): void => {
  const reader: FileReader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>): void => {
    if (!e.target || !e.target.result) {
      throw new Error("Failed to read file");
    }

    const data: Uint8Array = new Uint8Array(e.target.result as ArrayBuffer);
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: "array" });
    const sheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Days Mapping
    const dayMappings: DayMappings = {
      Monday: ["B", "C", "D", "E", "F", "G"],
      Tuesday: ["I", "J", "K", "L", "M", "N"],
      Wednesday: ["P", "Q", "R", "S", "T", "U"],
      Thursday: ["W", "X", "Y", "Z", "AA", "AB"],
      Friday: ["AD", "AE", "AF", "AG", "AH", "AI"],
      Saturday: ["AK", "AL", "AM", "AN", "AO", "AP"],
    };

    // Time Mapping
    const timeMappings: TimeMappings = {
      "08:30 - 10:00": ["B", "I", "P", "W", "AD", "AK"],
      "10:15 - 11:45": ["C", "J", "Q", "X", "AE", "AL"],
      "12:00 - 13:30": ["D", "K", "R", "Y", "AF", "AM"],
      "13:00 - 14:30": ["E", "L", "S", "Z", "AG", "AN"],
      "14:45 - 16:15": ["F", "M", "T", "AA", "AH", "AO"],
      "16:30 - 18:00": ["G", "N", "U", "AB", "AI", "AP"],
    };

    const seances: ExtractedSeance[] = [];
    let row: number = 3;

    while (sheet[`A${row}`]) { // Stop when column A is empty
      Object.entries(dayMappings).forEach(([day, columns]: [string, string[]]) => {
        Object.entries(timeMappings).forEach(([time, timeColumns]: [string, string[]]) => {
          columns.forEach((col: string) => {
            if (timeColumns.includes(col)) {
              let val1: string = sheet[`${col}${row}`]?.v || "";
              const val2: string = sheet[`${col}${row + 1}`]?.v || "";
              const val3: string = sheet[`${col}${row + 2}`]?.v || "";
              const salle: string = sheet[`A${row}`]?.v || "";
              let tds: string[] = [];
              let tps: string[] = [];
              let exact_time: string = time;

              if (!val1 && !val2 && !val3) return;

              if (typeof val1 === 'string' && val1.includes("|")) {
                const [sectionValue, customTime] = val1.split(" |");
                val1 = sectionValue.trim();
                exact_time = customTime.trim();
              }

              if (typeof val1 === 'string' && val1.includes(",")) {
                if (val1.includes("TP")) {
                  tps = val1.split(",").map((sec: string) => sec.trim());
                } else {
                  tds = val1.split(",").map((sec: string) => sec.trim());
                }
                val1 = "";
              }

              if (typeof val1 === 'string' && val1.includes("TP")) {
                tps = [val1];
                val1 = "";
              }
              if (typeof val1 === 'string' && val1.includes("TD")) {
                tds = [val1];
                val1 = "";
              }

              const val3Entries: string[] = typeof val3 === 'string' && val3 ? val3.split(",").map((entry: string) => entry.trim()) : [""];

              for (const entry of val3Entries) {
                let type: string = "", duree: string = "", nature: string = "", matiere: string = "";
                if (entry) {
                  const parts: string[] = entry.split("-");
                  type = parts[0];

                  if (parts.length > 2 && /H|h/.test(parts[1])) duree = parts[1];

                  if (parts.includes("1/15")) nature = "1/15";

                  let startIndex: number = 1;
                  if (duree) startIndex++;
                  if (nature) startIndex++;
                  matiere = parts.slice(startIndex).join("-");
                }

                seances.push({
                  jours: day,
                  temps: exact_time,
                  enseignant: val2,
                  matiere,
                  salle,
                  section: val1,
                  tds,
                  type,
                  duree,
                  nature,
                  tps,
                });
              }
            }
          });
        });
      });

      row += 3;
    }

    if (callback) callback(seances);
  };

  reader.readAsArrayBuffer(file);
};

export default readExcelFile;