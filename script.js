let scores = Array(7).fill(0);

function selectAnswer(questionNumber, score, button) {
    scores[questionNumber - 1] = score;

    // 同じ質問のすべてのボタンから active クラスを削除
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('selected');
    });

    // クリックされたボタンに active クラスと selected クラスを追加
    button.classList.add('active');
    button.classList.add('selected');

    document.getElementById('next-btn-' + questionNumber).style.display = 'block';
}

function nextQuestion(currentQuestionNumber) {
    const currentQuestion = document.querySelector(`.question[data-question="${currentQuestionNumber}"]`);
    currentQuestion.style.display = 'none';
    const nextQuestion = document.querySelector(`.question[data-question="${currentQuestionNumber + 1}"]`);

    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    } else {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        generateChart();
        displayComments();
    }
}

function generateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    document.getElementById('myChart').style.display = 'block';

    if (window.myRadarChart) {
        window.myRadarChart.destroy();
    }

    const topPadding = window.innerWidth <= 600 ? 10 : 20; // 画面幅に応じた余白を設定
    const pointLabelFontSize = window.innerWidth <= 600 ? 14 : 20; // 画面幅に応じたラベルのフォントサイズを設定
    const legendFontSize = window.innerWidth <= 600 ? 16 : 24; // 画面幅に応じたレジェンドのフォントサイズを設定

    window.myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                '健康管理方針の策定',
                '健康管理体制の整備',
                '従業員の健康診断の実施',
                '健康教育の実施',
                'ストレスチェックの実施',
                'メンタルヘルス対策の実施',
                '健康経営に関する情報の公開'
            ],
            datasets: [{
                label: '健康経営度',
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: topPadding // 画面幅に応じた上部の余白を設定
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 2,
                    ticks: {
                        beginAtZero: true,
                        max: 2
                    },
                    pointLabels: {
                        font: {
                            size: pointLabelFontSize // ラベルのフォントサイズを動的に設定
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: legendFontSize // レジェンドのフォントサイズを動的に設定
                        }
                    }
                }
            }
        }
    });
}


// ウィンドウのリサイズイベントを監視し、チャートを再描画
window.addEventListener('resize', generateChart);
