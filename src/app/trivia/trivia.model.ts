import { Choices } from "app/modals/add-trivia-modal/add-trivia-modal.component";

export interface Trivia {
    id: string,
    title: string,
    question: string,
    category: string,
    choices: string[],
    correct_answer: string,
    triviaProp: string,
    imagePath: string,
    blast_day: string,
    blast_hour: string,
    blast_from: string,
    blast_to: string
}