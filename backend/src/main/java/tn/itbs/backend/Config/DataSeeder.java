package tn.itbs.backend.Config;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import tn.itbs.backend.entites.*;
import tn.itbs.backend.enums.RendezVousStatut;
import tn.itbs.backend.repository.*;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner init(
            PatientRepository patientRepo,
            MedecinRepository medecinRepo,
            RendezVousRepository rvRepo,
            ConsultationRepository consRepo
    ) {
        return args -> {

            if (patientRepo.count() > 0) return;

            // ===================== PATIENTS =====================
            List<Patient> patients = new ArrayList<>();

            patients.add(createPatient("Ali Ben Salah", "20111111", 1995, 3, 12));
            patients.add(createPatient("Sara Trabelsi", "20112222", 2000, 7, 21));
            patients.add(createPatient("Mohamed Amri", "20113333", 1988, 1, 5));
            patients.add(createPatient("Aya Jebali", "20114444", 1999, 11, 30));
            patients.add(createPatient("Khalil Fersi", "20115555", 1992, 9, 14));
            patients.add(createPatient("Ines Ben Youssef", "20116666", 2001, 6, 8));
            patients.add(createPatient("Omar Chaabane", "20117777", 1985, 2, 19));
            patients.add(createPatient("Rania Hamdi", "20118888", 1997, 12, 2));
            patients.add(createPatient("Youssef Haddad", "20119999", 1990, 4, 25));
            patients.add(createPatient("Amel Gharbi", "20110001", 1996, 8, 10));

            patientRepo.saveAll(patients);

            // ===================== MEDECINS =====================
            List<Medecin> medecins = new ArrayList<>();

            medecins.add(createMedecin("Dr. Ahmed Mansour", "Cardiologie"));
            medecins.add(createMedecin("Dr. Nadia Ben Ali", "Dermatologie"));
            medecins.add(createMedecin("Dr. Hichem Jaziri", "Médecine générale"));
            medecins.add(createMedecin("Dr. Leila Gharbi", "Pédiatrie"));
            medecins.add(createMedecin("Dr. Sami Kacem", "Orthopédie"));
            medecins.add(createMedecin("Dr. Mariem Triki", "Neurologie"));

            medecinRepo.saveAll(medecins);

            // ===================== RENDEZ-VOUS (60+) =====================
            List<RendezVous> rvs = new ArrayList<>();

            RendezVousStatut[] statuts = RendezVousStatut.values();

            int counter = 0;

            for (int day = 1; day <= 15; day++) {
                for (int i = 0; i < 4; i++) {

                    Patient p = patients.get((counter + i) % patients.size());
                    Medecin m = medecins.get((counter + i) % medecins.size());

                    RendezVous rv = new RendezVous();
                    rv.setPatient(p);
                    rv.setMedecin(m);
                    rv.setDate(LocalDate.now().plusDays(day));
                    rv.setHeure(LocalTime.of(8 + (i * 2), 0));
                    rv.setMotif(getMotif(i));
                    rv.setStatut(statuts[(counter + i) % statuts.length]);

                    rvs.add(rv);
                }
                counter++;
            }

            rvRepo.saveAll(rvs);

            // ===================== CONSULTATIONS =====================
            List<Consultation> consultations = new ArrayList<>();

            for (int i = 0; i < rvs.size(); i++) {
                if (i % 3 == 0) { // 1 consultation every 3 RVs
                    RendezVous rv = rvs.get(i);

                    Consultation c = new Consultation();
                    c.setRendezVous(rv);
                    c.setDiagnostic(getDiagnostic(i));
                    c.setOrdonnance(getOrdonnance(i));
                    c.setPrix(60f + (i % 5) * 10);

                    consultations.add(c);

                    rv.setConsultation(c);
                }
            }

            consRepo.saveAll(consultations);
            rvRepo.saveAll(rvs);

            System.out.println("🔥 FULL DATASET (50+ records) inserted successfully");
        };
    }

    // ===================== HELPERS =====================

    private Patient createPatient(String nom, String tel, int year, int month, int day) {
        Patient p = new Patient();
        p.setNom(nom);
        p.setNumTel(tel);
        p.setDateDeNaissance(LocalDate.of(year, month, day));
        return p;
    }

    private Medecin createMedecin(String nom, String spec) {
        Medecin m = new Medecin();
        m.setNom(nom);
        m.setSpecialite(spec);
        m.setDisponibilite(true);
        return m;
    }

    private String getMotif(int i) {
        String[] motifs = {
                "Consultation générale",
                "Douleur abdominale",
                "Contrôle médical",
                "Suivi chronique",
                "Fièvre persistante"
        };
        return motifs[i % motifs.length];
    }

    private String getDiagnostic(int i) {
        String[] diag = {
                "Infection virale",
                "Hypertension légère",
                "Allergie saisonnière",
                "Fatigue générale",
                "Douleur musculaire"
        };
        return diag[i % diag.length];
    }

    private String getOrdonnance(int i) {
        String[] ord = {
                "Paracétamol + repos",
                "Antibiotique léger",
                "Antihistaminique",
                "Vitamine C",
                "Anti-inflammatoire"
        };
        return ord[i % ord.length];
    }
}