import Container from '@mui/material/Container';
import styles from './index.module.css';
import Link from "next/link";
import Image from "next/image";

export default function About() {
    return (
        <Container maxWidth="md" className={styles.wrapper}>
            <h2>Background</h2>
            <p>
                Bit Heroes players often share game guides in Discord. From the
                OG unofficial server to the official server and every
                guild server in between, it&apos;s very difficult to find a specific guide.
                Searching is unreliable given the silos that have formed
                within the community, and authors often omit text with their
                uploads, making their guides unsearchable.
            </p>
            <p>
                A few of us were tired of the disorganisation and decided to collect and centralise
                all of the guides that we could find. We scoured forums and DMs, and
                after some experimenting and early prototypes, we built a guide bot
                that made its way into most of the active Discord servers in the community.
                That bot eventually became this website.
            </p>
            <p>
                I&apos;m very happy that you&apos;ve made it here. Whilst it may look old-school
                and rushed, I enjoy working on the site and hope that it makes your
                Heroic life a little Bit easier. As the site is actively maintained,
                please check back regularly for updates.
            </p>
            <p>
                Godspeed Hero,<br />
                [DÀRK] BillyIdol
            </p>

            <div className={styles["about-logo"]}>
                <Link href="https://vgen.co/pixltoast">
                    <p>
                        <Image
                            src="/pixltoast/bhguides_logo.gif"
                            alt="logo by pixltoast"
                            title="logo by pixltoast"
                            width={222}
                            height={222}
                        />
                    </p>
                </Link>
            </div>

            <h2>Submissions</h2>
            <p>
                For new guide submissions, please contact me on Discord and I&apos;ll
                happily upload it to the site.
            </p>
            <p>
                If you have an idea for a new calculator or other feature, please
                let me know! Same goes for any other comments or concerns.
            </p>

            <h2>Testimonials</h2>
            <p className={styles["testimonial"]}>
                    <em>
                        &ldquo;bhguides is my most frequented website by a huge margin xD&rdquo;
                        <br />
                        --[TMNT] ratman
                    </em>
                </p>

            <h2>Credits</h2>
            <p><strong>Guide Authors:</strong> 3riko, 5Rupees, a_poor_ninja, Adhesive81, AlbacorePrism, Alysias, Antomanz, ATacoTitan, Ballbreaker, Barlooow1987, Bat, BillyIdol, Bisamratte, Bitverse_Andy, Blanquiito, Blasphemy, Captain_Crunchie, ChubbyDaemon, Chuck, Colb, Commander, Crow, CyberMuffin, DarkHand6, Dispel1, Dracaris, Dude_WTF, EdwardGenius, Ee, Eliealsamaan85, Ember, Envious, Equilibrandt, FergusFerret, fohpo, Fr3sTy7, Fyra, Gagf, Gavx, Goku, Goolmuddy, Gylgymesh, Hæl (aka Hael on this page), Huen11, IanBob2, iiTicTac, Infermis, ItsMBSCastillo, JDizzle, JDtheGreat, Jermoshua, JoeBu, Joemama, John_Hatten2, josiah_4, kruste, Kuz55, Lord_Adman, Lqd, Maddbz, ManBearPig, MaxBrand99, McSploosh, Melody (Choco), Mentle88, MrRager, Mochi, Neflarian, n1ghtmaree, Olivernoko, Orcaaa, PAINisGOD93, Parad0x, PocketApple8104, ponymarc, PrimeDyze, Pristine, RoastyChicken, Rome, ShawnBond, Sizz, skye666, Smolder, Sora, Special_Delivery, Talisman, Tarnym, Techno, Toad, Tolton, TooT, TrippyAfro, UnseenAxes, Vanterio, VesaN, Winter, WRLD_EATR, Youreprettycute, ZENICKS, and ZombieSlayer13</p>
            <p><strong>Idea for Original Guides Discord Bot:</strong> Trogburn</p>
            <p><strong>Coding:</strong> BillyIdol • <a href="https://github.com/deadloct/bhguides.com">Source on GitHub</a></p>
            <p><strong>Initial Data Aggregation:</strong> BillyIdol, ShawnBond, Trogdor, and ZombieSlayer13</p>
            <p><strong>Logo:</strong> <Link href="https://vgen.co/pixltoast">pixltoast</Link>, gifted by ZombieSlayer13</p>
            <p><strong>Honourable Mentions:</strong> Hip224, Robskino</p>
            <p>Thanks to anybody else that helped but was not mentioned because I forgot!</p>
        </Container>
    );
}
