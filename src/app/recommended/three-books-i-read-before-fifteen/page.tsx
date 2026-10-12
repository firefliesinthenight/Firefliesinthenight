import type { Metadata } from "next";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import EssayBody from "@/components/EssayBody";
import RespondToPiece from "@/components/RespondToPiece";
import AuthorNote from "@/components/AuthorNote";

export const metadata: Metadata = {
  title: "Three Books I Read Before Fifteen",
  description: "The books that set his thinking in motion, before he had language for it.",
};

// Drawn from Ahmad's own notes ("Ahmad's Reading Life — Anchored in Time" and
// "Critical Thinking as Inheritance"); quoted lines are his words. DRAFT —
// pending Ahmad's approval of the wording before publication.
const paragraphs = [
  "This isn't a best-of list.",
  "These aren't the best books I ever read. They're the three that got to me first, before I had the words for what they were doing to me.",
  "One I pushed back against. One showed me what a Muslim man could be. One gave me somewhere to stand.",
  "## 1. Bahishti Zewar",
  "Around age ten.",
  "In a lot of South Asian Muslim homes, Bahishti Zewar sat on the shelf right next to the Qur'an. Heavenly Ornaments. A manual for how a Muslim woman should live: her prayer, her dress, her marriage, her conduct. To question it was, for many people, to question Islam itself.",
  "I read it on a burnt orange couch, and something in my stomach said no.",
  "> It didn't sit right with me. There was something wrong with that book.",
  "I couldn't have told you why. I was ten. It was a feeling, not an argument. A God who seemed like a scorekeeper. A girl's silence counted as her yes. Rules everywhere, and mercy hard to find.",
  "It got me questioning the Islam we were being taught and what was all around me.",
  "I didn't have anyone to tell. So I kept the question.",
  "Looking back, almost everything I've cared about since started there. Not because the book taught me what to believe. Because it taught me to notice when something calling itself Islam was missing the spirit of it.",
  "## 2. The Autobiography of Malcolm X",
  "Elementary school.",
  "A son of Pakistani immigrants in 1980s New Jersey, reading Malcolm X. That was not the usual assignment.",
  "Here was a man who changed his understanding and was honest enough to change his name with it. A man who walked away from a version of the faith that was too small, went to Hajj, and came back with something truer. A man who refused to stay quiet, and paid for it.",
  "He showed me that Islam wasn't a costume from somewhere else. It belonged to an American man from Omaha and Boston and Harlem just as much as it belonged to my uncles.",
  "Years later, when my second son was born, I named him after Malcolm.",
  "That name was a prayer. It said: be the kind of man who tells the truth, even when it costs you.",
  "## 3. The Bible, the Qur'an and Science",
  "Thirteen or fourteen. Handed to me by my eldest brother, Basit.",
  "Maurice Bucaille was a French surgeon, a Catholic, at one point the personal physician to King Faisal. In his fifties he learned Arabic so he could read the Qur'an for himself, not through anyone's commentary. Then he set it and the Bible side by side against what modern science knew.",
  "> It was my anchor.",
  "Not because of the conclusion. Because of the method.",
  "Here was a serious man examining scripture with a serious mind, and the Qur'an held. I didn't have to choose between thinking and believing. My father was a veterinarian, a man of cause and effect, and also a man who helped build masjids. Bucaille told me those two sides of my house were not at war.",
  "A year later Basit gave me Bucaille's next book, on the origin of man.",
  "> It was what I was looking for. There were no English Muslim authors, and it grounded me.",
  "People forget that. In 1986 there was no internet, no lectures on YouTube, almost nothing written by Muslims in English for a kid like me. I was reading in a desert. And my brother kept handing me water.",
  "He's been handing me books for decades. Most of my turning points came wrapped in paper from him.",
  "## What they added up to",
  "A book I rejected. A man I wanted to become. A book that held my weight.",
  "Within a couple of years my life came apart in ways I'll tell elsewhere. I went into those years with an anchor already set. That's not a small thing for a fifteen-year-old.",
  "If you're a parent: put books in your children's hands. Even ones you're not sure about. Especially ones that make them ask questions.",
  "They'll find their anchor. Sometimes it's the book that didn't sit right that teaches them what to look for.",
];

export default function ThreeBooksPage() {
  return (
    <Container className="py-14 sm:py-20">
      <BackLink href="/recommended" label="Recommended" />

      <article className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl">
          Three Books I Read Before Fifteen
        </h1>
        <p className="mt-3 font-body text-lg italic text-cream-300">
          The books that set his thinking in motion, before he had language for it.
        </p>

        <EssayBody paragraphs={paragraphs} />

        <AuthorNote />

        <RespondToPiece title="Three Books I Read Before Fifteen" />
      </article>
    </Container>
  );
}
