# example of adding data to seance :
## example 1 (type != "CR" ) :
{

    "seance": {
        "jour": "TUESDAY",
        "temps": "08:30",
        "duree": 2,
        "type": "TP",
        "nature" : "1/15",
        "matiere": {
            "nom": "Chimie"
        },
        "salle": {
            "id": "C-01"
        },
        "professeur": {
            "nom": "Lazher Lhamel"
        }
    },
    "tds": [
        {
            "id": "CPI1_TD1"
        },
        {
            "id": "CPI1_TD2"
        }
    ]
}

## example 2 (type == "CR" ) :

{

    "seance": {
        "jour": "TUESDAY",
        "temps": "08:30",
        "duree": 2,
        "type": "CR",
        "nature" : "1/7",
        "section" : {
            "id": "CPI1"
        },
        "matiere": {
            "nom": "Chimie"
        },
        "salle": {
            "id": "C-01"
        },
        "professeur": {
            "nom": "Lazher Lhamel"
        }
    }

}
