// 카메라 활성화
const camera = document.getElementById('camera');

// 사용자 장치의 카메라 피드 
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        camera.srcObject = stream;
    })
    .catch((error) => {
        console.error('카메라를 활성화할 수 없습니다.', error);
    });

// 드래그 이미지
const overlayImage = document.getElementById('overlay-image');

let isDragging = false;
let offsetX, offsetY;

// 드래그 시작
overlayImage.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - overlayImage.offsetLeft;
    offsetY = event.clientY - overlayImage.offsetTop;
    overlayImage.style.cursor = 'grabbing';
});

// 드래그 중
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        overlayImage.style.left = `${event.clientX - offsetX}px`;
        overlayImage.style.top = `${event.clientY - offsetY}px`;
    }
});

// 드래그 종료
document.addEventListener('mouseup', () => {
    isDragging = false;
    overlayImage.style.cursor = 'grab';
});