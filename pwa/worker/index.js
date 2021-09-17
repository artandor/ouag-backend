'use strict'

self.addEventListener('push', function (event) {
  const data = JSON.parse(event.data.text())
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: '/android-chrome-192x192.png',
      data: {'url': '/gifts/received/' + data.giftId}
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(openUrl(event.notification.data.url))
})

async function openUrl(url) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (let i = 0; i < windowClients.length; i++) {
    const client = windowClients[i];
    const clientUrl = new URL(client.url)
    if (clientUrl.pathname === url && "focus" in client) {
      return client.focus();
    }
  }
  if (self.clients.openWindow && url.length > 0) {
    return self.clients.openWindow(url);
  }
  return self.clients.openWindow('/');
}
