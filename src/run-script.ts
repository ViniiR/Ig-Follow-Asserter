browser.runtime.onMessage.addListener((req, sen, res) => {
  if (req.action == "readPage") {
    const followersList = document.querySelector(
      ".x6nl9eh > div:nth-child(1) > div:nth-child(1)",
    );
    document.body.innerHTML = "";
    console.log("teste");
  }
});
