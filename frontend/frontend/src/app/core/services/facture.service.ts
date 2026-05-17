import { Injectable, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ConsultationService } from '../../features/consultation/services/consultation.service';
import { RendezVousService } from '../../features/rendezvous/services/rendezvous.service';
import { PatientService } from '../../features/patients/services/patient.service';
import { MedecinService } from '../../features/medecins/services/medecin.service';
import { Consultation } from '../../features/consultation/models/consultation';

@Injectable({ providedIn: 'root' })
export class FactureService {
    private consultationService = inject(ConsultationService);
    private rvService = inject(RendezVousService);
    private patientService = inject(PatientService);
    private medecinService = inject(MedecinService);

    genererFacture(consultation: Consultation): void {
        this.rvService.getById(consultation.idRendezVous).subscribe({
            next: (rv) => {
                forkJoin({
                    patient: this.patientService.getById(rv.idPatient),
                    medecin: this.medecinService.getById(rv.idMedecin),
                }).subscribe({
                    next: ({ patient, medecin }) => {
                        this.ouvrirFacture(consultation, rv, patient, medecin);
                    }
                });
            }
        });
    }

    private ouvrirFacture(consultation: any, rv: any, patient: any, medecin: any): void {
        const today = new Date().toLocaleDateString('fr-FR');
        const dateRdv = rv.date
            ? (rv.date.includes('/') ? rv.date : new Date(rv.date).toLocaleDateString('fr-FR'))
            : '-';
        const heureRdv = rv.heure ? rv.heure.substring(0, 5) : '-';
        const dob = patient.dateDeNaissance
            ? new Date(patient.dateDeNaissance).toLocaleDateString('fr-FR')
            : '-';
        const numFacture = `FAC-${consultation.idConsultation.toString().padStart(4, '0')}`;

        // Ordonnance lignes
        const lignes = (consultation.ordonnance ?? '').split('\n').filter((l: string) => l.trim());
        const ordonnanceHTML = lignes.length > 0 ? `
      <table class="ord-table">
        <thead>
          <tr><th>Médicament</th><th>Dose</th><th>Fréquence</th></tr>
        </thead>
        <tbody>
          ${lignes.map((l: string, i: number) => {
            const p = l.split(' - ');
            return `<tr class="${i % 2 === 0 ? '' : 'alt'}">
              <td>${p[0] ?? '-'}</td>
              <td>${p[1] ?? '-'}</td>
              <td>${p[2] ?? '-'}</td>
            </tr>`;
        }).join('')}
        </tbody>
      </table>` : '<p class="empty">Aucune ordonnance.</p>';

        const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>Facture ${numFacture}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; color: #0a1628; background: #f8fafc; }

    .page { max-width: 800px; margin: 30px auto; background: white;
            border-radius: 12px; overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.10); }

    /* Header */
    .header { background: linear-gradient(135deg, #7c3aed, #a855f7);
               padding: 32px 40px; color: white; }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .clinic-name { font-size: 26px; font-weight: 800; letter-spacing: 0.5px; }
    .clinic-sub  { font-size: 13px; opacity: 0.85; margin-top: 4px; }
    .facture-meta { text-align: right; }
    .facture-num  { font-size: 18px; font-weight: 700; }
    .facture-date { font-size: 12px; opacity: 0.85; margin-top: 4px; }

    /* Infos */
    .infos { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 28px 40px; }
    .info-box { background: #f8fafc; border: 1px solid #e2e8f0;
                border-radius: 10px; padding: 16px 20px; }
    .info-label { font-size: 10px; font-weight: 700; color: #7c3aed;
                  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
    .info-name  { font-size: 15px; font-weight: 700; color: #0a1628; margin-bottom: 4px; }
    .info-detail { font-size: 12px; color: #6b7a99; margin-top: 2px; }

    /* Body */
    .body { padding: 0 40px 28px; }

    .section-title { font-size: 13px; font-weight: 700; color: #0a1628;
                     margin: 20px 0 8px; display: flex; align-items: center; gap: 8px; }
    .section-title::after { content: ''; flex: 1; height: 1px; background: #7c3aed; opacity: 0.3; }

    .rdv-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 4px; }
    .rdv-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
    .rdv-item .lbl { font-size: 10px; color: #6b7a99; font-weight: 600; text-transform: uppercase; }
    .rdv-item .val { font-size: 13px; font-weight: 600; color: #1a2540; margin-top: 2px; }

    .diag-box { background: #faf5ff; border: 1px solid #e9d5ff;
                border-radius: 8px; padding: 14px 18px; font-size: 13px;
                color: #374151; line-height: 1.6; }

    /* Ordonnance table */
    .ord-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .ord-table thead tr { background: #7c3aed; color: white; }
    .ord-table thead th { padding: 10px 14px; text-align: left; font-weight: 600; }
    .ord-table tbody td { padding: 9px 14px; color: #374151; }
    .ord-table tbody tr { border-bottom: 1px solid #f1f5f9; }
    .ord-table tbody tr.alt { background: #f8fafc; }

    /* Total */
    .total-row { display: flex; justify-content: flex-end; margin-top: 24px; }
    .total-box { background: linear-gradient(135deg, #7c3aed, #a855f7);
                 color: white; border-radius: 10px; padding: 16px 28px; text-align: right; }
    .total-label { font-size: 11px; opacity: 0.85; text-transform: uppercase;
                   letter-spacing: 0.08em; }
    .total-amount { font-size: 26px; font-weight: 800; margin-top: 2px; }

    /* Footer */
    .footer { background: #7c3aed; color: white; text-align: center;
              padding: 14px; font-size: 12px; opacity: 0.9; margin-top: 8px; }

    /* Print */
    @media print {
      body { background: white; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="header-top">
      <div>
        <div class="clinic-name">🏥 Clinique Médicale</div>
        <div class="clinic-sub">Facture de Consultation</div>
      </div>
      <div class="facture-meta">
        <div class="facture-num">${numFacture}</div>
        <div class="facture-date">Émise le ${today}</div>
        <div class="facture-date">RDV N° ${rv.idRendezVous}</div>
      </div>
    </div>
  </div>

  <div class="infos">
    <div class="info-box">
      <div class="info-label">Patient</div>
      <div class="info-name">${patient.nom}</div>
      <div class="info-detail">📞 ${patient.numTel}</div>
      <div class="info-detail">🎂 Né(e) le ${dob}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Médecin</div>
      <div class="info-name">Dr. ${medecin.nom}</div>
      <div class="info-detail">🩺 ${medecin.specialite}</div>
    </div>
  </div>

  <div class="body">

    <div class="section-title">Détails du Rendez-vous</div>
    <div class="rdv-grid">
      <div class="rdv-item"><div class="lbl">Date</div><div class="val">${dateRdv}</div></div>
      <div class="rdv-item"><div class="lbl">Heure</div><div class="val">${heureRdv}</div></div>
      <div class="rdv-item"><div class="lbl">Motif</div><div class="val">${rv.motif ?? '-'}</div></div>
    </div>

    

    <div class="total-row">
      <div class="total-box">
        <div class="total-label">Montant total</div>
        <div class="total-amount">${Number(consultation.prix).toFixed(2)} TND</div>
      </div>
    </div>

  </div>

  <div class="footer">
    Clinique Médicale — Merci de votre confiance
  </div>

  <div class="no-print" style="text-align:center; padding: 20px;">
    <button onclick="window.print()"
      style="background:#7c3aed; color:white; border:none; padding:12px 32px;
             border-radius:8px; font-size:15px; font-weight:600; cursor:pointer;">
      📄 Télécharger en PDF
    </button>
    <button onclick="window.close()"
      style="background:#f1f5f9; color:#374151; border:1px solid #e2e8f0;
             padding:12px 32px; border-radius:8px; font-size:15px;
             font-weight:600; cursor:pointer; margin-left:12px;">
      Fermer
    </button>
  </div>

</div>
</body>
</html>`;

        const win = window.open('', '_blank', 'width=900,height=700');
        if (win) {
            win.document.write(html);
            win.document.close();
        }
    }
}