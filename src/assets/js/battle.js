
const methods = {
    connectWebSocket() {
        const socket = new WebSocket('ws://localhost:8090/api/battle/connectRoom');
        socket.onopen = () => {
            console.log('WebSocket 연결 성공');
        };

        socket.onmessage = (event) => {
            this.handleMessage(event.data); // 메시지 핸들링 함수 호출
        };

        socket.onerror = (error) => {
            console.error('WebSocket 오류:', error);
        };

        this.socket = socket; // Vue 데이터에 WebSocket 객체 저장
    },

    startWebSocket() {
        this.connectWebSocket();
    },

    closeWebSocket() {
        if (this.socket) {
            this.socket.close();
            console.log('WebSocket 연결 종료');
        }
    },

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            console.log('메시지 전송:', message);
        } else {
            console.error('WebSocket 연결이 열려있지 않습니다.');
        }
    },

    handleMessage(message) {
        // 서버로부터 수신한 메시지 처리 로직
        console.log('서버로부터 메시지 수신:', message);
        // 메시지를 Toast로 표시하거나 다른 동작 수행 가능
        this.$successAlert(message); // 예시: 성공 메시지를 Toast로 표시
    },
}
export default {
    install(Vue) {
        Vue.config.globalProperties.$battleConnect = methods.connectWebSocket;
        Vue.config.globalProperties.$battleStartWebSocket = methods.startWebSocket;
        Vue.config.globalProperties.$battleCloseWebSocket = methods.closeWebSocket;
        Vue.config.globalProperties.$battleSendMessage = methods.sendMessage;
    },
};

