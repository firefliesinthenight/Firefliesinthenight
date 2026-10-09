import type { Metadata } from "next";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import RespondToPiece from "@/components/RespondToPiece";
import EpisodeVideo from "@/components/EpisodeVideo";

export const metadata: Metadata = {
  title: "Movement Was My Oxygen",
  description: "The opening essay — where this collection starts.",
};

// Source: "THROUGH THE STORMS — Episode 03 — Movement Was My Oxygen — FINAL"
// (status: FINAL / RECORDING VERSION, finalized August 28, 2026). Imported
// verbatim; final web publication may still depend on the finished video
// packaging, per the implementation handoff.
const paragraphs = [
  "God made me like a shark.",
  "I have to move in order to breathe.",
  "At least that's how I've understood myself for most of my life.",
  "Some people can sit. They can wait. Think about something for six months. Spectate.",
  "I'm not built like that.",
  "Give me a problem and I want movement.",
  "Make a call. Open something. Close something. Fix something. Get somebody in the room.",
  "Anything.",
  "Just don't leave me sitting there with layer upon layer upon layer of thought—and all the whirlwinds that go on in my mind.",
  "And movement worked for a long time.",
  "That's important, because people like to look at something later and call it a bad habit, as though it was always bad.",
  "Sometimes the thing that eventually hurts you is the thing that saved you first.",
  "When my wife died, I had been with her for more than thirty years.",
  "People say your heart breaks.",
  "It's more than the heart.",
  "It felt like my soul had been torn apart.",
  "Your body doesn't work right. Your mind doesn't work right. Even your skin hurts.",
  "You're angry. You're pissed.",
  "And one of the things I remember from those first months is surprisingly ordinary.",
  "A lot of people simply disappeared.",
  "June. July. August. September.",
  "I'm not talking about somebody coming to explain death to me.",
  "I mean a cup of water.",
  "Stopping by.",
  "A pan of lasagna.",
  "Something.",
  "Just the ordinary things human beings do when another human being is on the floor.",
  "And somewhere in me I kept thinking: Guys, we gotta move. We gotta do something.",
  "I've got a family.",
  "We've got to get off the floor. At least onto our knees. Then maybe onto our feet.",
  "But silence was the response.",
  "Then COVID hit. A whole other set of problems.",
  "Later, plans were stagnant again. The plan had been made. We'd charted the course. Now it was time to execute.",
  "But the we wasn't there.",
  "So what did I do?",
  "I moved.",
  "I opened businesses. Three of them, one after another.",
  "Pissed. Angry. Moving.",
  "Looking back now, I can almost see the machinery.",
  "Something hurts? Move.",
  "Something feels dead? Create life somewhere else.",
  "A decision you can't settle?",
  "Go.",
  "What's the worst that happens? You fall on your face?",
  "Fine.",
  "At least you'll know. Don't leave a question mark.",
  "And I still believe there's something admirable in that.",
  "Doing nothing is also a decision. People can spend half their lives protecting themselves from mistakes and uncertainty—and create a different mistake:",
  "the life they never entered.",
  "But here's what I'm only beginning to understand.",
  "Movement wasn't always courage.",
  "Sometimes it was oxygen.",
  "And a man who thinks he's fighting for everybody can be doing something much more primitive at the same time:",
  "just trying to breathe.",
  "For years I thought of myself as the shepherd.",
  "Family. Businesses. Employees. Whatever Allah had placed in my hands.",
  "Move them forward. Protect them. Do something.",
  "Looking back, I'm not sure every movement was shepherding.",
  "Some of it was.",
  "And some of it was me desperately trying to keep the shepherd himself alive.",
  "Those aren't always the same thing.",
  "Good intentions were there. Responsibility. Love.",
  "But frustration was there too. Anger. Fear, maybe. Ego. Regret.",
  "And grief was underneath much more than I understood.",
  "But I didn't quit.",
  "I never quit on anything.",
  "So three things can be true at once:",
  "Movement saved me.",
  "Movement cost me.",
  "And movement is simply part of the way God made me.",
  "The question isn't whether movement was good or bad.",
  "The better question is:",
  "What was I moving toward? What was I moving past? And what was I moving away from?",
  "Because you can move very fast and fail to notice what's already in your hands.",
  "I've been thinking about blessings that way.",
  "Sometimes we treat blessings like Monopoly money.",
  "Monopoly blessings. Fake currency.",
  "Family. Health. Time. Someone sitting beside you. A functioning body.",
  "You keep gambling with the chips because somewhere in your mind you assume the banker can always hand you more.",
  "Then life teaches you:",
  "some currency doesn't get reissued.",
  "That's where stewardship enters the picture for me now.",
  "Not just: What can I build with what I've been given?",
  "But: Am I taking care of what I've already been given?",
  "At 54, I don't think the lesson is that the shark should become a cow and lie down in the grass.",
  "That's not me either.",
  "I'm still a shark.",
  "But maybe I don't need twenty actions today.",
  "Maybe six or seven good ones are enough.",
  "And they don't all have to be grand slams.",
  "Bunts and singles count.",
  "Make the call. Pay the bill. Keep the promise. Finish one thing. Pray.",
  "Then tomorrow, move again.",
  "Maybe maturity isn't learning to stop being the creature God made you.",
  "Maybe it's learning the proper speed.",
  "Knowing when movement is courage—",
  "and when it's panic.",
  "When it's stewardship—",
  "and when it's escape.",
  "I'm still a shark.",
  "I don't think that's changing.",
  "But maybe I don't need an ocean full of emergencies anymore just to know I'm alive.",
  "Maybe I can breathe in smaller movements now.",
  "Bunts. Singles. One faithful thing at a time.",
];

export default function MovementWasMyOxygenPage() {
  return (
    <Container className="py-14 sm:py-20">
      <BackLink href="/in-search-of-beauty" label="In Search of Beauty" />

      <article className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl">
          Movement Was My Oxygen
        </h1>
        <p className="mt-3 font-body text-lg italic text-cream-300">
          The opening essay — where this collection starts.
        </p>

        <EpisodeVideo
          episodeLabel="Through the Storms — Episode 03"
          title="Movement Was My Oxygen"
          videoUrl={null}
          youtubeId="4pZ2X87npEE"
        />

        <div className="mt-10 flex max-w-prose flex-col gap-5 font-body text-lg leading-loose text-cream-200">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <RespondToPiece title="Movement Was My Oxygen" />
      </article>
    </Container>
  );
}
