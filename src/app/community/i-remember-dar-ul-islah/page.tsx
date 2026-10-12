import type { Metadata } from "next";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import EssayBody from "@/components/EssayBody";
import RespondToPiece from "@/components/RespondToPiece";

export const metadata: Metadata = {
  title: "I Remember — Dar ul Islah",
  description:
    "A personal account of the community that shaped a marriage, a family, and a history.",
};

// Drawn from Ahmad's own account in Buyahka & Abrar, Chapter 3 ("Dar ul Islah,
// the Two Patriarchs, and the Boy They Caught"). DRAFT — pending Ahmad's
// approval of the wording before publication.
const paragraphs = [
  "Before there was a building, there was a garage.",
  "Copley Avenue, Teaneck. A Friday afternoon. I was seven, maybe eight.",
  "The garage door was open. Rugs laid down on concrete. The smell of motor oil that never left the room, and under it, the attar the men had brought in little bottles. Under that, bread from a neighbor's kitchen.",
  "In the backyard there was a pigeon coop.",
  "I remember the pigeons cooing through the wall during the khutbah before I remember a single word the imam said.",
  "Eight or ten men. Boys threading between grown-up legs to find each other. Someone called the iqamah, and I took my place at the back, between my father's hand and my brother's elbow.",
  "That garage was the first place I ever heard the word community used about people I could see.",
  "## The men who moved the chairs",
  "The garage didn't last. Then it was someone's basement. Someone's living room. The prayers kept happening, because prayers don't need a building.",
  "But the men had started looking at each other and asking a bigger question.",
  "My father was not the man with the pen. Dr. Khalid Beg signed the first check.",
  "My father was the momentum. The force that got things moving. The phone calls in the evening. The drives to look at lots before anyone else had seen them.",
  "He had done it before. In Corona, Queens, he helped get Masjid al-Falah started. Then the family moved to Teaneck, and he did it again. Rinse and repeat.",
  "At ten, I thought all fathers were like that.",
  "It took me twenty years, and my own attempts at building, to understand how rare it is. And how much rarer it is to do it without bitterness.",
  "## What a boy sees",
  "I remember a small lot with a hut on it, and an old woman's garden behind it. Neat rows of vegetables. She met us at the door. She had agreed to sell.",
  "I remember Uncle Tahir and Uncle Masoom picking us up for Fajr. Sometimes in a green station wagon. Sometimes in a red Firebird. These were not solemn old men. These were men with cars they loved.",
  "I remember Uncle Hameedudin throwing a football around with the boys after Fajr.",
  "I remember Uncle Suri cutting wooden arrows by hand and painting them yellow with white borders, to point the cars where to park. Nobody was coming to build us a parking system. So he built one.",
  "I remember the Ramadan tent that went up every year before there was a permanent roof. Canvas, prayer rugs, and a hundred and fifty people behaving like it was a marble courtyard.",
  "I remember Ajaz saab making huge pots of tea, because somebody had to make the tea, and he had decided it would be him.",
  "And I remember the sign.",
  "It was painted by Mr. Wilbur, the art teacher at Longfellow School. A Black American Muslim. He painted the words Dar-ul-Islah and they hung it on the chain-link fence, and it stayed there for years.",
  "I didn't understand it then. I understand it now. The first public face of a mosque founded by immigrants from the subcontinent was painted by an American. Anyone who tells me Islam is foreign to this country, I think about that sign.",
  "## It took everyone",
  "It wasn't only the men with the checks and the backhoes.",
  "Auntie Nusrat. My mother, Shagufta. Auntie Masoom. And a host of others. Every one of them a different personality, and the community needed every one of them.",
  "Some pushed. Some held. Some fed everybody. Some kept people in line. A community doesn't survive on one kind of person.",
  "## House of Reform",
  "When the elders sat down to name it, they didn't choose House of Faith. They didn't choose House of Peace.",
  "They chose Dar ul Islah. House of Reform.",
  "They named it after the work still left to do. Almost nobody names a thing after its weakness on purpose. Those men were either unusually humble or unusually clear-eyed.",
  "I think now they were both.",
  "The idea was talked about from 1975. The land was bought in 1979. The building was finished in 1985. Ten years from conversation to dome.",
  "The elders argued over two designs: a modest one, and an ambitious one with a dome and a minaret. Both sides were sincere. Both had their reasons. The vote went to the dome. That minaret is still visible from the New Jersey Turnpike, exactly as the men who voted for it hoped.",
  "That's what building a community really looks like. Not unity. Disagreement, held inside a shared project.",
  "## What I carry",
  "The men who built Dar ul Islah did not stay together. The community split, and the split went to court. I sat in that courtroom as a boy and listened. That is a story for another day, and I tell it carefully.",
  "But I won't let the ending erase the building.",
  "A handful of families in a garage grew into a community of hundreds. Children of immigrants went through high school and college and into businesses and professions. A generation learned what showing up looks like, before anyone explained it to them.",
  "I inherited the work of men who didn't know they were teaching me anything.",
  "The phone call nobody sees. The arrows painted by hand. The pot of tea nobody asked you to make.",
  "If I have built anything worth keeping, it started on a concrete floor that smelled like motor oil and attar, listening to pigeons through the wall.",
  "House of Reform.",
  "We're still working on it.",
];

export default function IRememberDarUlIslahPage() {
  return (
    <Container className="py-14 sm:py-20">
      <BackLink href="/community" label="Community" />

      <article className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl">
          I Remember — Dar ul Islah
        </h1>
        <p className="mt-3 font-body text-lg italic text-cream-300">
          A personal account of the community that shaped a marriage, a family, and a history.
        </p>

        <EssayBody paragraphs={paragraphs} />

        <RespondToPiece title="I Remember — Dar ul Islah" />
      </article>
    </Container>
  );
}
