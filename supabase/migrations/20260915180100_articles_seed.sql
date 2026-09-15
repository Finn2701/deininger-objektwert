-- Erste drei Ratgeber-Artikel. ON CONFLICT (slug) DO NOTHING, damit ein
-- erneutes Ausführen der Migration (z. B. bei einem Reset) keine im Backend
-- inzwischen bearbeiteten Texte überschreibt.

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'immobilie-geerbt-wert-ermitteln',
  'Immobilie geerbt: Wie das Finanzamt den Wert ermittelt – und was Sie tun können',
  'Nach einem Erbfall verlangt das Finanzamt eine Erklärung – und legt dafür oft einen eigenen, pauschalen Immobilienwert zugrunde. Wie dieser Wert zustande kommt und wann sich ein Gegenbeweis lohnt.',
  'Wie das Finanzamt den Wert einer geerbten Immobilie ermittelt, warum der Ansatz oft zu hoch ausfällt und welche Möglichkeiten Sie nach § 198 BewG haben, einen niedrigeren Wert nachzuweisen.',
  $html$<p>Wenn ein Erbfall eintritt, meldet sich meist zuerst das Finanzamt – mit der Aufforderung, eine Erbschaftsteuererklärung abzugeben. Für die dazugehörige Immobilie setzt die Behörde dabei einen eigenen Wert an, den sogenannten gemeinen Wert zum Todestag. Wie dieser Wert zustande kommt, ist vielen Erben nicht klar, und genau da entstehen oft unnötige Sorgen oder – umgekehrt – eine zu hohe Steuerlast, die man gar nicht hinnehmen müsste.</p>

<h2>Wie das Finanzamt den Wert berechnet</h2>
<p>Grundlage ist das Bewertungsgesetz, konkret die §§ 157 ff. BewG. Für Eigentumswohnungen sowie Ein- und Zweifamilienhäuser wendet das Finanzamt in der Regel das Vergleichswertverfahren an: Es greift auf die Kaufpreissammlung des örtlichen Gutachterausschusses zurück und leitet daraus einen Wert für Ihre Immobilie ab, orientiert an tatsächlich gezahlten Preisen vergleichbarer Objekte in der Umgebung. Bei vermieteten oder gewerblich genutzten Objekten kommt stattdessen häufiger das Ertragswertverfahren zum Einsatz, bei besonderen Objekten das Sachwertverfahren.</p>
<p>Wichtig zu verstehen: Das ist ein typisiertes, standardisiertes Verfahren. Es arbeitet mit Durchschnittswerten und groben Vergleichsdaten – nicht mit einer Begehung Ihrer konkreten Immobilie.</p>

<h2>Warum der Finanzamtswert oft nicht zur Realität passt</h2>
<p>Genau das ist der Kern des Problems. Ein Sanierungsstau, eine ungünstige Grundstückszuschnitt, Lärmbelastung oder ein schlechter baulicher Zustand fließen in das pauschale Verfahren kaum ein. Das Finanzamt kennt Ihr Haus nicht von innen. Die Folge: Der angesetzte Wert kann spürbar über dem liegen, was die Immobilie am Markt tatsächlich erzielen würde – und damit auch die Erbschaftsteuer unnötig in die Höhe treiben.</p>

<h2>Was Sie tun können, wenn der Wert zu hoch wirkt</h2>
<p>Das Bewertungsgesetz sieht genau für diesen Fall eine Öffnungsklausel vor: Nach § 198 BewG dürfen Sie einen niedrigeren gemeinen Wert nachweisen, wenn Sie belegen können, dass der tatsächliche Wert unter dem vom Finanzamt typisiert ermittelten liegt. In der Praxis geschieht das über ein Wertgutachten eines öffentlich bestellten und vereidigten Sachverständigen. Aus der steuerlichen Beratungspraxis wird berichtet, dass solche anerkannten Gutachten nicht selten 20 bis 50 Prozent unter dem vom Finanzamt angesetzten Wert liegen – wobei das naturgemäß stark vom Einzelfall abhängt.</p>
<p>Ein solches Gutachten ist mit Kosten verbunden, deshalb lohnt sich vorab eine ehrliche Einschätzung: Liegt der Finanzamtswert wirklich erkennbar über dem realistischen Marktwert, oder bewegt er sich im plausiblen Rahmen? Nur im ersten Fall rechnet sich der Aufwand.</p>

<h2>Der sinnvolle erste Schritt</h2>
<p>Bevor Sie ein kostenpflichtiges Gutachten in Auftrag geben, würde ich Ihnen immer zu einer unverbindlichen ersten Einschätzung raten. Sie ersetzt kein förmliches Gutachten nach § 198 BewG – dafür braucht es einen öffentlich bestellten Sachverständigen –, gibt Ihnen aber innerhalb weniger Minuten eine realistische Wertspanne, mit der Sie einordnen können, ob sich der nächste Schritt überhaupt lohnt. Gerade bei einer geerbten Immobilie, deren Zustand man oft selbst nicht genau kennt, ist das ein guter Ausgangspunkt.</p>
<p>Wenn Sie anschließend eine fundiertere, auf Ihre konkrete Immobilie zugeschnittene Einschätzung möchten, spreche ich mit Ihnen gerne persönlich über die Details – ganz ohne Verpflichtung.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/bewg/__198.html" target="_blank" rel="noopener">§ 198 BewG – Nachweis des niedrigeren gemeinen Werts (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bewg/__157.html" target="_blank" rel="noopener">§ 157 BewG – Feststellung von Grundbesitzwerten (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'was-kostet-immobilienbewertung',
  'Was kostet eine Immobilienbewertung? Kostenloser Online-Check vs. Gutachten im Vergleich',
  'Kostenlose Online-Ersteinschätzung, Kurzgutachten oder gerichtsfestes Verkehrswertgutachten – die drei Stufen unterscheiden sich stark in Preis, Aufwand und Verwendungszweck. Ein Überblick.',
  'Kostenloser Online-Check, Kurzgutachten oder Verkehrswertgutachten nach § 194 BauGB: Unterschiede, typische Preise und wann welche Bewertungsstufe tatsächlich notwendig ist.',
  $html$<p>„Was kostet eigentlich eine Immobilienbewertung?" ist eine der Fragen, die mir am häufigsten gestellt werden – und die ehrliche Antwort lautet: Das kommt darauf an, wofür Sie die Bewertung brauchen. Es gibt nicht die eine Immobilienbewertung, sondern mehrere Stufen mit sehr unterschiedlichem Preis, Aufwand und rechtlicher Belastbarkeit. Hier ordne ich die drei gängigsten ein.</p>

<h2>Stufe 1: Die kostenlose Online-Ersteinschätzung</h2>
<p>Ein Online-Rechner wie meiner arbeitet mit Ihren Angaben zu Lage, Wohnfläche, Baujahr und Zustand sowie mit regionalen Vergleichs- und Bodenrichtwertdaten. Das Ergebnis ist eine transparente Wertspanne, die Sie sofort und unverbindlich erhalten. Der Vorteil: kein Aufwand, keine Kosten, schnelle Orientierung. Die Grenze: Ohne eine Besichtigung vor Ort bleibt jede Online-Einschätzung eine Annäherung – Details wie tatsächlicher Sanierungszustand, Grundrissqualität oder besondere Mängel fließen nicht ein.</p>

<h2>Stufe 2: Das Kurzgutachten</h2>
<p>Ein Kurzgutachten ist meist für private Zwecke gedacht, etwa zur eigenen Orientierung vor einem Verkauf oder innerhalb der Familie. Die Preise beginnen bei grob 500 Euro, je nach Aufwand und Objekt auch darüber. Ein Kurzgutachten ist in der Regel nicht gerichtsfest und wird von Banken, Gerichten oder dem Finanzamt meist nicht als vollwertiger Nachweis anerkannt.</p>

<h2>Stufe 3: Das Verkehrswertgutachten nach § 194 BauGB</h2>
<p>Das ist die belastbare, gerichtsfeste Variante, erstellt von einem öffentlich bestellten und vereidigten Sachverständigen. Sie brauchen sie typischerweise bei Erbauseinandersetzungen, Scheidungen, vor Gericht oder gegenüber dem Finanzamt (etwa als Nachweis eines niedrigeren Werts nach § 198 BewG). Die Kosten orientieren sich meist an 0,5 bis 1,5 Prozent des ermittelten Verkehrswerts. Bei einem Einfamilienhaus im Wert von 500.000 Euro landen Sie damit grob bei 1.800 bis 2.800 Euro Honorar; ein gerichtsfestes Vollgutachten beginnt oft erst ab etwa 3.000 Euro. Manche Sachverständige rechnen auch nach Stundensatz ab, üblich sind 120 bis 180 Euro pro Stunde bei einem Gesamtaufwand von 15 bis 25 Stunden für Ortstermin, Recherche und Ausarbeitung.</p>

<h2>Welche Stufe brauchen Sie wirklich?</h2>
<ul>
<li><strong>Reine Orientierung, z. B. vor einem möglichen Verkauf:</strong> Die kostenlose Online-Einschätzung reicht in den meisten Fällen völlig aus.</li>
<li><strong>Finanzierungsgespräch mit der Bank:</strong> Hier entscheidet die Bank – manche akzeptieren eine fundierte Einschätzung, andere verlangen ein eigenes Gutachten.</li>
<li><strong>Erbschaft, Scheidung, Gerichtsverfahren, Finanzamt:</strong> Hier führt kein Weg an einem echten Verkehrswertgutachten vorbei.</li>
</ul>

<h2>Der sinnvolle erste Schritt</h2>
<p>Bevor Sie in ein kostenpflichtiges Gutachten investieren, würde ich immer erst zur kostenlosen Ersteinschätzung raten. Sie zeigt Ihnen die realistische Größenordnung und hilft einzuschätzen, ob sich der nächste, teurere Schritt für Ihre Situation überhaupt lohnt. Gerne bespreche ich anschließend mit Ihnen persönlich, welche Stufe für Ihr konkretes Anliegen die richtige ist.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/baugb/__194.html" target="_blank" rel="noopener">§ 194 BauGB – Verkehrswert (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'bodenrichtwert-erklaert',
  'Bodenrichtwert erklärt: Was er bedeutet und wie stark er Ihren Immobilienwert beeinflusst',
  'Der Bodenrichtwert taucht in Bewertungen, Notarunterlagen und Finanzamtsschreiben auf – ist aber kein Grundstückspreis. Was er wirklich zeigt und wo Sie ihn für Ihr Grundstück finden.',
  'Was ein Bodenrichtwert ist, wer ihn festlegt, wo Sie ihn für Ihr Grundstück (z. B. in Baden-Württemberg über BORIS-BW) finden – und warum er nicht mit dem tatsächlichen Grundstückspreis gleichzusetzen ist.',
  $html$<p>Der Begriff taucht in fast jeder Immobilienbewertung auf, in Notarunterlagen und manchmal auch in Schreiben vom Finanzamt: der Bodenrichtwert. Viele Eigentümer haben ihn schon einmal gelesen, ohne genau zu wissen, was er eigentlich aussagt – und noch wichtiger: was er nicht aussagt.</p>

<h2>Was ist ein Bodenrichtwert genau?</h2>
<p>Ein Bodenrichtwert ist ein durchschnittlicher Lagewert in Euro pro Quadratmeter für ein unbebautes Grundstück in einer bestimmten Zone, der sogenannten Bodenrichtwertzone. Er bezieht sich auf ein fiktives Referenzgrundstück, das die dort typischen Merkmale abbildet – etwa übliche Grundstücksgröße, Erschließungszustand und Art der zulässigen Nutzung. Er ist also ein Orientierungswert für eine ganze Gegend, keine Einzelbewertung.</p>

<h2>Wer legt den Bodenrichtwert fest?</h2>
<p>Zuständig sind die Gutachterausschüsse für Grundstückswerte, die es in jedem Bundesland gibt. Sie führen eine Kaufpreissammlung, in der tatsächlich abgeschlossene Grundstücksverkäufe erfasst werden, und leiten daraus die Richtwerte für die jeweiligen Zonen ab. Die Werte werden regelmäßig aktualisiert, meist im ein- bis zweijährigen Rhythmus, je nach Bundesland.</p>

<h2>Wo finden Sie den Bodenrichtwert für Ihr Grundstück?</h2>
<p>Bundesweit gebündelt sind die Werte über das Portal BORIS-D abrufbar. Da Bodenrichtwerte aber Ländersache sind, lohnt sich meist der direkte Weg über das jeweilige Landesportal – für Baden-Württemberg und damit auch für Heidenheim an der Brenz und den Ostalbkreis ist das BORIS-BW. Je nach Bundesland ist die Abfrage kostenlos oder mit einer geringen Gebühr verbunden.</p>

<h2>Warum der Bodenrichtwert nicht der Grundstückspreis ist</h2>
<p>Das ist der Punkt, an dem die meisten Missverständnisse entstehen. Der Bodenrichtwert beschreibt ein durchschnittliches, fiktives Grundstück in Ihrer Zone – nicht Ihr konkretes Grundstück. Zuschnitt, genaue Lage innerhalb der Zone, Erschließung, Altlasten, Baurecht im Detail oder ein Gefälle können den tatsächlichen Wert Ihres Grundstücks nach oben oder unten von diesem Richtwert abweichen lassen. Er ist ein seriöser Ausgangspunkt, aber kein fertiges Ergebnis.</p>

<h2>Welche Rolle er in Ihrer Bewertung spielt</h2>
<p>Trotz dieser Einschränkung ist der Bodenrichtwert ein zentraler Baustein jeder Wertermittlung: Er fließt ins Vergleichswert- und ins Sachwertverfahren ein und ist auch für die Erbschaft- und Schenkungsteuer relevant, weil das Finanzamt sich bei der Bewertung von Grundstücksanteilen ebenfalls darauf stützt. Auch in meiner eigenen Bewertungslogik ist der regionale Bodenrichtwert eine von mehreren Grundlagen – kombiniert mit den individuellen Merkmalen Ihrer Immobilie, die ein reiner Richtwert eben nicht abbilden kann.</p>

<h2>Der sinnvolle erste Schritt</h2>
<p>Wenn Sie wissen möchten, wie sich der Bodenrichtwert Ihrer Lage konkret auf den Wert Ihrer Immobilie auswirkt, ist die kostenlose Online-Ersteinschätzung ein guter Startpunkt – sie bezieht die regionalen Werte automatisch mit ein und zeigt Ihnen eine erste, realistische Spanne.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.bodenrichtwerte-boris.de/" target="_blank" rel="noopener">BORIS-D – Bodenrichtwertinformationssystem für Deutschland</a></li>
<li><a href="https://www.gutachterausschuesse-bw.de/borisbw/" target="_blank" rel="noopener">BORIS-BW – Bodenrichtwertinformationssystem Baden-Württemberg</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;
