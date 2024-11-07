let randomNumber = Math.floor(Math.random() * 500) + 1;
        let attempts = 0;
        let maxAttempts = 20;

        document.getElementById('submitGuess').addEventListener('click', function() {
            const guess = Number(document.getElementById('guess').value);
            attempts++;
            let resultText = '';
            let attemptsLeft = maxAttempts - attempts;

            if (guess < 1 || guess > 500) {
                resultText = '1부터 500 사이의 숫자를 입력하세요.';
            } else if (guess > randomNumber) {
                resultText = '더 작은 숫자를 시도해 보세요.';
            } else if (guess < randomNumber) {
                resultText = '더 큰 숫자를 시도해 보세요.';
            } else {
                resultText = `축하합니다! ${attempts}번 만에 맞추셨습니다!`;
                document.getElementById('result').innerText = resultText;
                document.getElementById('attemptsLeft').style.display = 'none';  // 남은 횟수 숨김
                document.getElementById('restart').style.display = 'block';
                document.getElementById('submitGuess').disabled = true;
                return;  // 여기서 함수 종료하여 다른 텍스트가 나타나지 않도록 함
            }

            // 힌트 추가
            if (attempts >= 5 && attempts < 10) {
                resultText += ` \n(힌트 : ${randomNumber.toString().length}자리 숫자입니다.)`;
            } else if (attempts >= 10 && attempts < 15) {
                const lastDigit = randomNumber % 10;
                resultText += ` \n(힌트 : 마지막 자리 숫자는 ${lastDigit}입니다.)`;
            } else if (attempts >= 15 && attempts < 20) {
                const secondDigit = Math.floor((randomNumber % 100) / 10);
                resultText += ` \n(힌트 : 두 번째 자리 숫자는 ${secondDigit}입니다.)`;
            }

            if (attemptsLeft > 0 && resultText.includes('시도해 보세요.')) {
                document.getElementById('result').innerText = resultText;
                document.getElementById('attemptsLeft').innerText = `남은 횟수: ${attemptsLeft}`;
            } else if (attemptsLeft === 0 && !resultText.includes('축하합니다!')) {
                resultText = '모든 횟수를 다 사용했습니다. 다시 시도해 보세요!';
                document.getElementById('restart').style.display = 'block';
                document.getElementById('submitGuess').disabled = true;
                document.getElementById('attemptsLeft').innerText = `남은 횟수: 0`;
            }

            document.getElementById('result').innerText = resultText;
        });

        document.getElementById('restart').addEventListener('click', function() {
            randomNumber = Math.floor(Math.random() * 500) + 1;
            attempts = 0;
            document.getElementById('result').innerText = '';
            document.getElementById('guess').value = '';
            document.getElementById('attemptsLeft').innerText = `남은 횟수: ${maxAttempts}`;
            document.getElementById('attemptsLeft').style.display = 'block';  // 남은 횟수 다시 표시
            document.getElementById('restart').style.display = 'none';
            document.getElementById('submitGuess').disabled = false;
        });

// FingerprintJS 초기화
FingerprintJS.load().then(fp => {
    fp.get().then(result => {
        // 지문 ID
        const visitorId = result.visitorId;
        console.log('Visitor ID:', visitorId);
        
        // 추가 정보 수집
        const deviceData = {
            userAgent: navigator.userAgent,
            screen: {
                width: window.screen.width,
                height: window.screen.height
            },
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            plugins: Array.from(navigator.plugins).map(plugin => plugin.name),
        };

        console.log('Device Data:', deviceData);
        // 데이터 서버에 전송 또는 처리
        // 서버에 데이터 전송 예시
        fetch('https://fc69-114-70-38-167.ngrok-free.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ visitorId, deviceData }),
        })
        .then(response => response.json())
        .then(data => console.log('Data sent successfully:', data))
        .catch((error) => console.error('Error sending data:', error));

    });
});

