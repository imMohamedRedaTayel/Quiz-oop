export class Quiz {

    constructor(results) {
        this.resultsArr = results
        console.log(this.resultsArr);
        this.currentIndex = 0;
        document.getElementById('totalAmount').innerText = this.resultsArr.length
        this.current = document.getElementById('current')
        this.question = document.getElementById('question')

        this.showQuestion()
        this.correctAnswer
        this.score = 0

        // Events
        document.getElementById('next').addEventListener('click', () => {
            this.nextQuestion();
        })
        document.getElementById('tryBtn').addEventListener('click', () => {
            location.reload()
        })

    }

    showQuestion() {

        this.current.innerHTML = this.currentIndex + 1
        const currentQuestion = this.resultsArr[this.currentIndex]
        this.question.innerHTML = currentQuestion.question
        const answers = [...currentQuestion.incorrect_answers] // [ {} , {} , {} ] incorrect_answers
        this.correctAnswer = currentQuestion.correct_answer
        const randomNumber = Math.ceil(Math.random() * answers.length)
        answers.splice(randomNumber, 0, this.correctAnswer)

        let cartona = ''
        for (let i = 0; i < answers.length; i++) {
            cartona += `
                <div class='d-flex my-3' >
                    <input id='${answers[i]}' type="radio" name="answer" value="${answers[i]}" >
                    <div class="state p-success-o ms-2" >
                        <label for='${answers[i]}' > ${answers[i]} </label>
                    </div>
                </div>
            `
        }
        document.getElementById('rowAnswer').innerHTML = cartona


    }

    nextQuestion() {

        const allChecked = document.querySelector(' [name="answer"]:checked ')?.value
        // ? null sefty 
        if (allChecked != undefined) {
            document.querySelector('#alert').classList.replace('d-block', 'd-none')
            this.currentIndex++;

            if (this.currentIndex > this.resultsArr.length - 1) {

                document.getElementById('quiz').classList.replace('d-block', 'd-none')
                setTimeout(() => {
                    document.getElementById('finish').classList.add('d-block')
                }, 1000);


                document.getElementById('score').innerText = this.score;


            } else {
                // showQuestion
                if (allChecked === this.correctAnswer) {
                    document.getElementById('Correct').classList.replace('d-none', 'd-block')
                    // تشغيل الصوت عندما يكون الجواب صحيح
                    // let correctAudio = document.getElementById('correctAudio');
                    // correctAudio.play();
                    setTimeout(() => {
                        document.getElementById('Correct').classList.replace('d-block', 'd-none');
                    }, 1000);

                    this.score++;
                }
                else {
                    document.getElementById('inCorrect').classList.replace('d-none', 'd-block')
                    // let incorrectAudio = document.getElementById('incorrectAudio')
                    // incorrectAudio.play();
                    setTimeout(() => {
                        document.getElementById('inCorrect').classList.replace('d-block', 'd-none');
                    }, 1000);
                }
                setTimeout(() => {
                    this.showQuestion();
                }, 1500);
            }
        } else {
            setTimeout(() => {
                document.querySelector('#alert').classList.replace('d-none', 'd-block')
            }, 1000);
        }
    }

}