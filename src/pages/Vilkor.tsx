import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Vilkor() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="container mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Tillbaka
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
          Allmänna Villkor - <span className="text-primary">SiteVyro</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-12">Senast uppdaterad: 2026-06-11</p>

        <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">1. Om SiteVyro</h2>
            <p>
              Dessa allmänna villkor reglerar användningen av tjänster som tillhandahålls av SiteVyro
              (“SiteVyro”, “vi”, “oss”).
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Företagsnamn: SiteVyro</li>
              <li>E-post: info@sitevyro.com</li>
              <li>Land: Sverige</li>
            </ul>
            <p className="mt-3">
              Genom att acceptera en offert, underteckna ett avtal eller använda våra tjänster godkänner
              kunden dessa villkor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">2. Tjänstens omfattning</h2>
            <p>
              SiteVyro erbjuder abonnemangsbaserade webbplatstjänster för företag, inklusive:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Design och utveckling av webbplatser</li>
              <li>Webbhosting</li>
              <li>Teknisk drift och underhåll</li>
              <li>Löpande support</li>
              <li>SEO-underhåll för kunder som valt detta tillägg eller paket</li>
              <li>Mindre löpande ändringar enligt valt abonnemang</li>
            </ul>
            <p className="mt-3">Samtliga tjänster erbjuds endast till företag.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">3. Beställningsprocess</h2>
            <p>Ett projekt påbörjas enligt följande process:</p>
            <ol className="list-decimal pl-6 mt-3 space-y-1">
              <li>SiteVyro lämnar offert.</li>
              <li>Kunden accepterar offert och undertecknar avtal.</li>
              <li>Kunden tillhandahåller nödvändigt material.</li>
              <li>SiteVyro påbörjar arbetet.</li>
            </ol>
            <p className="mt-3">Arbetet påbörjas inte innan nödvändigt material mottagits från kunden.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">4. Kundens material</h2>
            <p>Kunden ansvarar för att tillhandahålla nödvändigt material såsom:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Bilder</li>
              <li>Logotyper</li>
              <li>Texter</li>
              <li>Övrigt innehåll</li>
            </ul>
            <p className="mt-3">
              Om kunden önskar att specifika bilder eller logotyper används på webbplatsen måste dessa
              tillhandahållas innan arbetet kan påbörjas.
            </p>
            <p className="mt-3">
              Kunden ansvarar för att allt material som tillhandahålls får användas lagligt. SiteVyro
              ansvarar inte för eventuella upphovsrättsintrång, varumärkesintrång eller andra rättsliga
              anspråk som uppstår till följd av material som tillhandahållits av kunden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">5. Leverans och revisioner</h2>
            <p>
              Normal leveranstid är cirka en vecka från det att allt nödvändigt material mottagits.
              Angivna leveranstider är uppskattningar och utgör inte bindande garantier.
            </p>
            <p className="mt-3">Varje projekt inkluderar tre (3) revisionsomgångar.</p>
            <p className="mt-3">Projektet anses levererat när:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Kunden godkänt webbplatsen, eller</li>
              <li>Tre revisionsomgångar har genomförts, eller</li>
              <li>Webbplatsen publicerats på kundens domän enligt överenskommelse.</li>
            </ul>
            <p className="mt-3">
              Ytterligare ändringar utöver de tre inkluderade revisionsomgångarna debiteras med 200 SEK
              per timme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">6. Betalningsvillkor</h2>
            <p>Fakturering sker när webbplatsen anses levererad enligt punkt 5.</p>
            <p className="mt-3">
              Betalningsvillkor är sju (7) dagar från fakturadatum om inget annat avtalats skriftligen.
            </p>
            <p className="mt-3">
              SiteVyro har rätt att avbryta eller pausa arbete om kunden inte fullgör sina
              betalningsskyldigheter.
            </p>
            <p className="mt-3">
              Vid försenad betalning har SiteVyro rätt att debitera lagstadgad dröjsmålsränta samt
              eventuella lagstadgade avgifter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
              7. Abonnemang, hosting och underhåll
            </h2>
            <p>
              Efter leverans omfattas kunden av ett abonnemang om 175 SEK per månad enligt gällande
              avtal.
            </p>
            <p className="mt-3">Abonnemanget inkluderar:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Webbhosting</li>
              <li>Teknisk drift</li>
              <li>Säkerhets- och systemunderhåll</li>
              <li>Tre mindre ändringar per månad</li>
              <li>Löpande SEO-underhåll</li>
              <li>Support</li>
            </ul>
            <p className="mt-3">
              Abonnemanget har en bindningstid om sex (6) månader från avtalets startdatum.
            </p>
            <p className="mt-3">
              Efter bindningstidens slut löper abonnemanget tills det sägs upp av någon part.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">8. Utebliven betalning</h2>
            <p>
              Om abonnemangsavgiften inte betalas på förfallodagen skickas en betalningspåminnelse.
            </p>
            <p className="mt-3">
              Om betalning fortfarande inte mottagits inom sju (7) dagar efter förfallodatum har SiteVyro
              rätt att stänga av tjänsten och webbplatsen utan ytterligare förvarning.
            </p>
            <p className="mt-3">
              SiteVyro ansvarar inte för eventuella konsekvenser som uppstår till följd av avstängning på
              grund av utebliven betalning.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">9. Äganderätt och licens</h2>
            <p>
              Webbplatser som utvecklas av SiteVyro tillhandahålls som en abonnemangsbaserad tjänst.
            </p>
            <p className="mt-3">
              SiteVyro behåller äganderätten till webbplatsens kod, design, tekniska lösningar och
              tillhörande system.
            </p>
            <p className="mt-3">
              Kunden erhåller en begränsad rätt att använda webbplatsen så länge abonnemanget är aktivt
              och samtliga betalningar fullgörs.
            </p>
            <p className="mt-3">
              Om abonnemanget avslutas eller betalningar uteblir upphör kundens rätt att använda
              webbplatsen och SiteVyro har rätt att avpublicera eller stänga ner webbplatsen.
            </p>
            <p className="mt-3">Domännamn som registrerats i kundens namn förblir kundens egendom.</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">10. SEO</h2>
            <p>SiteVyro utför löpande SEO-arbete enligt överenskommet paket.</p>
            <p className="mt-3">
              SEO påverkas av ett stort antal externa faktorer som ligger utanför SiteVyros kontroll.
            </p>
            <p className="mt-3">
              SiteVyro lämnar därför inga garantier avseende specifika placeringar, rankingar eller
              resultat i sökmotorer såsom Google.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">11. Tredjepartstjänster</h2>
            <p>
              SiteVyro använder externa leverantörer för bland annat hosting, domäntjänster, programvara
              och teknisk infrastruktur.
            </p>
            <p className="mt-3">
              SiteVyro ansvarar inte för avbrott, förseningar eller problem som orsakas av tredje part
              och som ligger utanför SiteVyros rimliga kontroll.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">12. Ansvarsbegränsning</h2>
            <p>SiteVyro ska alltid eftersträva hög tillgänglighet och professionell leverans.</p>
            <p className="mt-3">
              SiteVyro ansvarar dock inte för indirekta skador, utebliven vinst, förlorade
              affärsmöjligheter, förlorad data eller andra följdskador som kan uppstå i samband med
              användningen av våra tjänster.
            </p>
            <p className="mt-3">
              SiteVyros totala ansvar ska under inga omständigheter överstiga det belopp kunden betalat
              till SiteVyro under de senaste tolv (12) månaderna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
              13. Referenser och marknadsföring
            </h2>
            <p>Kunden ger SiteVyro rätt att använda följande i marknadsföringssyfte:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Företagsnamn</li>
              <li>Logotyp</li>
              <li>Skärmbilder från webbplatsen</li>
              <li>Länkar till webbplatsen</li>
            </ul>
            <p className="mt-3">
              Materialet får användas i portfolio, säljpresentationer, sociala medier och annan
              marknadsföring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">14. Avbokning av projekt</h2>
            <p>
              Om kunden väljer att avbryta projektet innan leverans upphör SiteVyros skyldighet att
              färdigställa projektet.
            </p>
            <p className="mt-3">
              Eventuella redan genomförda betalningar återbetalas inte om annat inte följer av tvingande
              lag.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
              15. Tillämplig lag och tvister
            </h2>
            <p>Dessa villkor ska tolkas och tillämpas enligt svensk lag.</p>
            <p className="mt-3">
              Tvister som uppstår med anledning av dessa villkor ska i första hand lösas genom dialog
              mellan parterna.
            </p>
            <p className="mt-3">
              Om parterna inte kan nå en överenskommelse ska tvisten avgöras av svensk allmän domstol
              enligt svensk lag.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">16. Ändringar av villkoren</h2>
            <p>
              SiteVyro förbehåller sig rätten att när som helst uppdatera eller ändra dessa villkor.
            </p>
            <p className="mt-3">
              Den senaste versionen publiceras på SiteVyros webbplats och gäller från publiceringsdatumet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
