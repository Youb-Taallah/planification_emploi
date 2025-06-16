package ISIMM.planification;
import java.lang.String;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import ISIMM.planification.Enteties.*;
import ISIMM.planification.Repository.*;
import ISIMM.planification.Services.SeanceService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class PlanificationApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(PlanificationApplication.class, args);

		SeanceRepository seanceRepository = context.getBean(SeanceRepository.class);

		SeanceService service = context.getBean(SeanceService.class);

		service.deleteSeance(2L);


	}

}
