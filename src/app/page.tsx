"use client";
export default function Home() {
  async function handlePushTest() {
    try {
      if (!("Notification" in window)) {
        alert("이 브라우저는 알림을 지원하지 않습니다.");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("알림 권한이 거부되었습니다.");
        return;
      }

      const sw = navigator.serviceWorker?.controller
        ? await navigator.serviceWorker.ready
        : null;

      if (sw) {
        await sw.showNotification("safedog 테스트", {
          body: "푸시 알림이 정상 동작합니다! (SW)",
          icon: "/icons/icon-192x192.png",
        });
      } else {
        new Notification("safedog 테스트", {
          body: "푸시 알림이 정상 동작합니다! (dev)",
          icon: "/icons/icon-192x192.png",
        });
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <button
        className="w-48 text-xl bg-gray-400 p-2 m-2 rounded-md text-white"
        onClick={handlePushTest}
      >
        푸시 알림 테스트
      </button>
    </div>
  );
}
