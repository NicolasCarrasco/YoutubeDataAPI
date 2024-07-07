function getYoutubeVideoData(metric, videoId) {
  if (!videoId || videoId.trim() === '') {
    return "No Disponible"; // Retorna "No Disponible" si el ID del video está vacío o no es válido
  }

  try {
    var apiKey = 'XXXXXXXXX'; // Reemplaza esto con tu clave API real
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + videoId + '&key=' + apiKey;
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());

    if (json.items && json.items.length > 0) {
      var statistics = json.items[0].statistics;
      var snippet = json.items[0].snippet;

      var views = statistics.viewCount || "-";
      var likes = statistics.likeCount || "-";
      var comments = statistics.commentCount || "-";
      var publishedAt = snippet.publishedAt || "-";
      var date = new Date(publishedAt);
      var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "dd-mm-yyyy");
      var formattedTime = Utilities.formatDate(date, Session.getScriptTimeZone(), "hh:mm:ss");

      switch(metric) {
        case 1:
          return views;
        case 2:
          return likes;
        case 3:
          return comments;
        case 4:
          return formattedDate;
        case 5:
          return formattedTime;
        default:
          return "-";
      }
    } else {
      return "-";
    }
  } catch (e) {
    // Captura cualquier error que ocurra durante la ejecución y retorna "No Disponible"
    return "-";
  }
}
