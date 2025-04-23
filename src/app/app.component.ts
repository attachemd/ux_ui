import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';

interface MedicalHistoryBlock {
  title: string;
  class?: string;
  status?: string;
  surgeon?: string;
  note?: string;
}
interface MedicalHistoryEntity {
  title: string;
  blocks: MedicalHistoryBlock[];
}
interface Comment {
  id: number;
  author: string;
  text: string;
  quoteId?: number;
  date?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'uxui';

  isModalOpen: boolean = false; // Property to control modal visibility
  medicalHistoryEntities: MedicalHistoryEntity[] = [
    { title: 'Allergies', blocks:
        [
          { title: 'Penicillin', status: 'Severe', class: 'chip-color-level3', note: 'Anaphylaxis' },
          { title: 'Dust Mites', status: 'Mild', class: 'chip-color-level2'  },
        ]
    },
    { title: 'Risk assessment', blocks:
        [
          { title: 'Cardiovascular Risk', status: 'Severe', class: 'chip-color-level3'  },
          { title: 'Diabetes Risk', status: 'Medium', class: 'chip-color-level2', note: 'parent relation'  },
          { title: 'Fall Risk (Elderly)', status: 'Low', class: 'chip-color-level1'  },
        ]
    },
    { title: 'Medical conditions', blocks:
        [
          { title: 'Hypertension', status: 'Active', class: 'chip-color-normal'  },
          { title: 'class 2 Diabetes', status: 'Active', class: 'chip-color-normal'  },
        ]
    },
    { title: 'Treatments', blocks:
        [
          { title: 'Amoxicilline 500mg', status: 'Ongoing', class: 'chip-color-ongoing'  },
          { title: 'Floxin 20mg' , status: 'Done', class: 'chip-color-done'  },
        ]
    },
    { title: 'Vaccinations', blocks:
        [
          { title: 'ImmunoBarrier Plus', status: 'Done', class: 'chip-color-done'  },
          { title: 'HealthShield Proactive', status: 'Ongoing', class: 'chip-color-ongoing', note: 'Next dose due in 2 months'  },
          { title: 'VitaProtect Advanced', status: 'Done', class: 'chip-color-done'  },
          { title: 'SafeGuard Elite', status: 'Done', class: 'chip-color-done'  },
          { title: 'ProtectGuard Max', status: 'Done', class: 'chip-color-done'  },
          { title: 'CureShield Ultra', status: 'Ongoing', class: 'chip-color-ongoing'  },
          { title: 'DefendGuard Supreme', status: 'Done', class:'chip-color-done', note: 'complication' },
          { title:'ShieldGuard' ,status:'Done' ,class:'chip-color-done'},
          {title:'VitaDefender' ,status:'Done' ,class:'chip-color-done'},
          {title:'ImmunoDefend Pro' ,status:'Ongoing' ,class:'chip-color-ongoing'},
          {title:'DefendPlus' ,status:'Done' ,class:'chip-color-done'},
          {title:'SafeProtect Advanced' ,status:'Done' ,class:'chip-color-done'}
        ]
    },
    { title:'Chirurgical history' ,blocks:[
        {
          title:'Appendectomy',
          surgeon:'Dr. Johnson'
        },
        {
          title:'Knee Replacement',
          surgeon:'Dr. Martinez'
        }
      ]}
  ]

  comments: Comment[] = [
    { id: 1, author: 'Sanna Samar', text: 'Je tiens à laisser une note concernant le service que j\'ai reçu ici. J\'ai rencontré un problème avec la coordination des rendez-vous, où les horaires n\'étaient pas toujours respectés. J\'apprécierais une meilleure gestion de l\'emploi du temps pour une expérience plus fluide à l\'avenir.', date: 'il y a 23 minutes' },
    { id: 2, author: 'Sanna Samar', text: 'J\'ai eu des difficultés à joindre le service client par téléphone. Veuillez améliorer la réactivité.', date: 'il y a 10 minutes' },
    { id: 3, quoteId: 2, author: 'Dr.Hicham El Youbi', text: 'Nous vous remercions de nous avoir informés de ce problème. Nous allons immédiatement examiner nos processus pour améliorer la réactivité de notre service client par téléphone. Votre retour est précieux pour nous.', date: 'il y a 18 secondes' },
  ];

  /**
   * Finds a comment by its ID.
   * @param id The ID of the comment to find.
   * @returns The comment object if found, otherwise undefined.
   */
  getCommentById(id: number): Comment | undefined {
    return this.comments.find(comment => comment.id === id);
  }

  openModal() {
    this.isModalOpen = true;
    // Optional: Add a class to the body to prevent scrolling
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalOpen = false;
    // Optional: Remove the class from the body
    document.body.classList.remove('modal-open');
  }
}
