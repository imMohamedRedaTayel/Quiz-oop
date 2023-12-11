
import { Quiz } from "./quiz.module.js";

export class Setting {
    constructor() {
        this.setting = document.getElementById('setting')
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startQuestion();
        })
        this.results = []
    }

    async startQuestion() {
        const category = document.getElementById('category').value
        const difficulty = document.querySelector('[name="difficulty"]:checked').value
        const numOfQuestions = document.getElementById('numOfQuestions').value
        if (numOfQuestions > 0) {
            this.results.push(await this.getQuestion(category, difficulty, numOfQuestions))
            this.setting.classList.add('d-none')
            setTimeout(() => {
                document.getElementById('quiz').classList.add('d-block')
            }, 500);
            const quiz = new Quiz(this.results)
        }
        else {
            document.querySelector('.alert').classList.replace('d-none', 'd-block')
        }
    }

    async getQuestion(category, difficulty, numOfQuestions) {
        const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`)
        const response = await apiResponse.json()
        // console.log( response.results);  
        this.results = response.results
    }


}