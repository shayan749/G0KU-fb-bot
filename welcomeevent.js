const fs = require("fs");

module.exports = async function welcomeEvent({
  api,
  event,
  threadID,
  eventDelay
}) {

if (event.type !== "event") return;

/* ===== WELCOME MESSAGE ===== */

if (event.logMessageType === "log:subscribe") {

  const addedUsers = event.logMessageData.addedParticipants || [];

  for (const user of addedUsers) {

    if (user.userFbId == api.getCurrentUserID()) continue;

    const name = user.fullName || "New Member";
    const uid = user.userFbId;

    const welcomeMsg = `
╔═══━━━  🎎🎀  ━━━═══╗

         👑  𝓦𝓔𝓛𝓒𝓞𝓜𝓔  👑

        💖 𝓗𝓮𝓵𝓵𝓸 @${name}

✨ Yo[[ AB AAYA HE TO ANOX ORR AVIRAJ KI MAA CHOD NI PADEGI ✅🤞🏻]]
`;

    const mentionIndex = welcomeMsg.indexOf(`@${name}`);

    try {

      await eventDelay();

      await api.sendMessage(
        {
          body: welcomeMsg,
          mentions: [{
            tag: `@${name}`,
            id: uid,
            fromIndex: mentionIndex,
            length: name.length + 1
          }]
        },
        threadID
      );

    } catch (err) {
      console.log("Welcome send error:", err.message);
    }
  }
}


/* ===== LEFT / REMOVE MESSAGE ===== */

if (event.logMessageType === "log:unsubscribe") {

  const leftUID = event.logMessageData.leftParticipantFbId;
  let name = "Member";

  try {
    const info = await api.getUserInfo(leftUID);
    name = info[leftUID]?.name || "Member";
  } catch {}

  if (event.author && event.author !== leftUID) {

    const trollMsg = `
┏━━━━━━━━━━━━━━━┓
┃  🤭 𝑶𝒐𝒑𝒔𝒔𝒔𝒔 !! 🤭             ┃ 
┗━━━━━━━━━━━━━━━┛

🚫 @${name} ISKO ANOX OR AVIRAJ KI MA KE BHOSDE SE BAHER KAR DIYA HAHAHAHA ✅😂
`;

    const mentionIndex = trollMsg.indexOf(`@${name}`);

    await eventDelay();

    await api.sendMessage(
      {
        body: trollMsg,
        mentions: [{
          tag: `@${name}`,
          id: leftUID,
          fromIndex: mentionIndex,
          length: name.length + 1
        }]
      },
      threadID
    );

  } else {

    const goodbyeMsg = `
~•~•~•~ 💔 𝑮𝒐𝒐𝒅𝒃𝒚𝒆 💔 ~•~•~•~

🥺 @${name} 𝓰𝓻𝓸𝓾𝓹 𝓬𝓱𝓱𝓸𝓭 𝓰𝓪𝔂𝓮...

AB DUSRE GROUP ME ANOX OR AVIRAJ KI MAA CHODNA GOOD BYE DOST
`;

    const mentionIndex = goodbyeMsg.indexOf(`@${name}`);

    await eventDelay();

    await api.sendMessage(
      {
        body: goodbyeMsg,
        mentions: [{
          tag: `@${name}`,
          id: leftUID,
          fromIndex: mentionIndex,
          length: name.length + 1
        }]
      },
      threadID
    );

  }

}

};
