import type { Metadata } from "next";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import EssayBody from "@/components/EssayBody";
import RespondToPiece from "@/components/RespondToPiece";

export const metadata: Metadata = {
  title: "Critical Thinking Did Not Weaken My Faith",
  description: "On questioning belief without losing it.",
};

// Built from Ahmad's own spoken words (recorded May 3, 2026, in "Critical
// Thinking as Inheritance") and his written advice to his sons ("Intelligent
// Sources"). DRAFT — pending Ahmad's approval of the wording before publication.
const paragraphs = [
  "People sometimes assume that if you question things, you're on your way out of the faith.",
  "It went the other way for me.",
  "Here's how I read anything. A book, a khutbah, a news report, a forwarded message:",
  "> I don't take anything as gospel, and I question myself. I don't question out loud, but I question within. Who wrote this? Who is the author?",
  "Everything written by human beings carries something of the human being who wrote it. Some bias. Some agenda. Sometimes just a blind spot. Nothing written by us can be gospel, because we're human beings.",
  "The Qur'an, we hold to be God's words. Everything after that, every interpretation, every commentary, every opinion about it, came through people.",
  "And people can cherry-pick. Take any set of verses, any set of data, and you can paint whatever picture you want. That's true of any data set. It's true of religion too.",
  "So you have to look.",
  "## The Qur'an asks for it",
  "This isn't something I picked up from the West and smuggled into my Islam.",
  "The Qur'an says: do not pursue what you have no knowledge of. Again and again it says: in this are signs for a people who reflect.",
  "And when it describes the people who refused the truth, it gives their excuse in their own words: we found our fathers on a way, and we are following in their footsteps.",
  "Following blindly is what the Qur'an warns against. Reflecting is what it asks for.",
  "So when I question, I'm not stepping away from my faith. I'm doing what it told me to do.",
  "## The spirit and the letter",
  "If I had to put my whole life in one sentence, it might be this:",
  "> I go by the spirit of things, and other people will use the letter of the law to hurt another person.",
  "I've watched rules used as weapons. In the community. In families. In business. Someone finds the technicality and uses it to crush the obvious good-faith meaning of the thing.",
  "The rule was supposed to serve the mercy. When it's used against the mercy, something has gone wrong, no matter how many references come with it.",
  "Living by the spirit costs you. You assume good faith, and the people who use the letter as a weapon don't. I've paid for that more than once.",
  "I'd still rather pay it.",
  "## Thirty views instead of two",
  "I thank God, and my father and mother and my elders, that we were given this trait. Always.",
  "And I thank God we were brought here.",
  "Whatever is good or bad about the United States, here you're exposed to thirty different views about anything. Back home, maybe two. Old societies settle into their answers over thousands of years. Here it's a melting pot.",
  "Thirty views didn't dilute my faith. They made me find out which parts of it were God's and which parts were just habit.",
  "My brothers and I grew up at the same dinner table and turned out different, each of us wired a little differently, each taking the same house and the same Teaneck in our own way. But we all got the questions. And none of us lost the faith.",
  "## What I told my sons",
  "I didn't hand my sons a finished religion. I told them to search.",
  "Go and seek the truth for yourselves. Don't simply follow anyone until your search produces something that sits well with your fitra, the nature God gave you.",
  "What your parents and grandparents practiced is a good starting point. It isn't the final destination.",
  "When you see something wrong, even if you can't change it the way you'd like, you must still feel turbulence in your heart. The day you stop feeling it, worry.",
  "And the harder path is usually the better one.",
  "## Where it left me",
  "I've questioned. I still question, quietly, every day.",
  "I haven't lost God.",
  "What I lost was the version of religion that couldn't survive a question. I'm not sorry it's gone.",
  "What's left is smaller in some ways and much stronger. A few basic principles you know to be right, that feel right in your bones. Stick to those, and other doors open.",
  "Critical thinking didn't weaken my faith.",
  "It cleaned it.",
];

export default function CriticalThinkingPage() {
  return (
    <Container className="py-14 sm:py-20">
      <BackLink href="/sitting-with-buyahka" label="Sitting with Buyahka" />

      <article className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl">
          Critical Thinking Did Not Weaken My Faith
        </h1>
        <p className="mt-3 font-body text-lg italic text-cream-300">
          On questioning belief without losing it.
        </p>

        <EssayBody paragraphs={paragraphs} />

        <RespondToPiece title="Critical Thinking Did Not Weaken My Faith" />
      </article>
    </Container>
  );
}
