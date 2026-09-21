-- Erweiterung des Ratgebers um vier Themen aus der dokumentierten
-- Content-Strategie (docs/business/akquise-strategie-erstmandate.md):
-- Erbengemeinschaft, Teilungsversteigerung, Nachlassimmobilie
-- vermieten-vs-verkaufen, Scheidungsimmobilie. Gleiches Format wie die
-- ersten drei Artikel: Rechtsquellen recherchiert und zitiert
-- (gesetze-im-internet.de), gleicher Ton/Struktur, jeweils mit CTA zur
-- kostenlosen Online-Ersteinschätzung.

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'erbengemeinschaft-immobilie-verkaufen',
  'Immobilie in der Erbengemeinschaft verkaufen: Was Sie wissen müssen, wenn nicht alle einer Meinung sind',
  'Eine geerbte Immobilie gehört meist mehreren Erben gemeinsam – und für den Verkauf braucht es die Zustimmung aller. Was das bedeutet und welche Wege es gibt, wenn sich die Erbengemeinschaft nicht einig wird.',
  'Warum eine Erbengemeinschaft eine Immobilie nur einstimmig verkaufen kann (§ 2038, § 2040 BGB), was bei Uneinigkeit möglich ist und welche Rolle die Teilungsversteigerung als letztes Mittel spielt.',
  $html$<p>Erbt eine Familie gemeinsam ein Haus, entsteht damit automatisch eine Erbengemeinschaft – und die funktioniert anders, als viele erwarten. Anders als bei Alleineigentum kann hier nicht einer allein entscheiden, was mit der Immobilie geschieht. Das führt in der Praxis häufig zu Verzögerungen, manchmal zu echtem Streit. Hier ein Überblick, worauf es ankommt.</p>

<h2>Warum alle Erben zustimmen müssen</h2>
<p>Eine Erbengemeinschaft ist rechtlich eine Gesamthandsgemeinschaft: Der Nachlass gehört allen Miterben gemeinsam, nicht in einzelnen, frei verkäuflichen Anteilen. Der Verkauf einer Nachlassimmobilie zählt nach § 2040 BGB zu den Verfügungen, die alle Miterben nur gemeinschaftlich treffen können. Fehlt auch nur eine Unterschrift, kann der Notar den Kaufvertrag nicht wirksam beurkunden – selbst wenn die Mehrheit der Erben verkaufen möchte.</p>
<p>Etwas anders sieht es bei der laufenden Verwaltung aus: Maßnahmen zur Erhaltung des Nachlasses darf nach § 2038 Abs. 1 Satz 2 BGB grundsätzlich auch ein einzelner Miterbe allein veranlassen, etwa eine dringende Reparatur. Der Verkauf selbst gehört aber nicht dazu.</p>

<h2>Wenn ein Miterbe nicht verkaufen will</h2>
<p>In der Praxis ist genau das der häufigste Streitpunkt: Ein Teil der Erben möchte verkaufen, ein anderer will die Immobilie behalten oder selbst nutzen. Ohne Einigung bleibt die Immobilie blockiert – niemand kann sie verkaufen, aber oft auch niemand allein sinnvoll nutzen. Für diese Situation sieht das Gesetz mehrere Auswege vor.</p>

<h2>Die Auseinandersetzung verlangen</h2>
<p>Jeder Miterbe kann nach § 2042 Abs. 1 BGB jederzeit die Auseinandersetzung der Erbengemeinschaft verlangen – also die endgültige Aufteilung des Nachlasses. Bei einer Immobilie, die sich nicht real teilen lässt, bedeutet das in der Regel: Sie wird zu Geld gemacht, entweder durch einen einvernehmlichen Verkauf oder, wenn keine Einigung gelingt, durch eine gerichtliche Teilungsversteigerung.</p>

<h2>Alternativen zur Teilungsversteigerung</h2>
<p>Eine Teilungsversteigerung sollte aus Sicht aller Beteiligten meist die letzte Option sein: Sie ist öffentlich, oft langwierig, und der erzielte Preis liegt in der Praxis regelmäßig unter dem, was ein regulärer Verkauf am freien Markt einbringen würde. Vor diesem Schritt lohnen sich meist zwei Alternativen: Ein Miterbe kauft die Anteile der anderen aus (Auszahlung), oder alle einigen sich doch noch auf einen gemeinsamen freihändigen Verkauf – oft moderiert durch einen neutralen Makler oder Gutachter, der einen realistischen, für alle nachvollziehbaren Wert ermittelt.</p>

<h2>Der sinnvolle erste Schritt</h2>
<p>Bevor eine Erbengemeinschaft überhaupt über Verkauf, Auszahlung oder Versteigerung diskutiert, hilft eine neutrale, unverbindliche Werteinschätzung allen Beteiligten weiter – sie schafft eine gemeinsame Gesprächsgrundlage, statt dass jeder Miterbe mit einer eigenen Zahl in die Diskussion geht. Gerade in emotional aufgeladenen Situationen ist das oft der entscheidende erste Schritt zu einer Einigung. Ich unterstütze Erbengemeinschaften dabei gerne mit einer kostenlosen Ersteinschätzung und, wenn gewünscht, einem persönlichen Gespräch mit allen Beteiligten.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/bgb/__2038.html" target="_blank" rel="noopener">§ 2038 BGB – Verwaltung des Nachlasses (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bgb/__2040.html" target="_blank" rel="noopener">§ 2040 BGB – Verfügung über Nachlassgegenstände (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bgb/__2042.html" target="_blank" rel="noopener">§ 2042 BGB – Auseinandersetzung der Erbengemeinschaft (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'teilungsversteigerung-vermeiden',
  'Teilungsversteigerung vermeiden: Warum sie meist die schlechtere Lösung ist – und was stattdessen hilft',
  'Wenn sich Miteigentümer nach Erbfall oder Scheidung nicht einig werden, droht die Teilungsversteigerung. Sie dauert oft über ein Jahr und bringt selten den vollen Wert. Welche Alternativen es gibt.',
  'Was eine Teilungsversteigerung ist (§§ 180 ff. ZVG), warum sie meist einen Wertverlust bedeutet, wie lange das Verfahren dauert und mit welchen Schritten sich eine Teilungsversteigerung noch vermeiden lässt.',
  $html$<p>Können sich Miteigentümer einer Immobilie – etwa Miterben oder ehemalige Ehepartner – partout nicht einigen, bleibt als letztes rechtliches Mittel die Teilungsversteigerung. Sie wird oft als Drohung ins Spiel gebracht, ist aber für alle Beteiligten in der Regel die wirtschaftlich schlechteste Lösung. Was genau dahintersteckt und wie sich das Verfahren häufig noch vermeiden lässt.</p>

<h2>Was eine Teilungsversteigerung ist</h2>
<p>Eine Teilungsversteigerung ist eine besondere Form der Zwangsversteigerung, geregelt in den §§ 180 bis 185 des Gesetzes über die Zwangsversteigerung und die Zwangsverwaltung (ZVG). Anders als bei einer klassischen Zwangsversteigerung wegen Schulden geht es hier nicht um eine Forderung gegen den Eigentümer, sondern darum, gemeinschaftliches Eigentum – etwa einer Erbengemeinschaft oder ehemaliger Ehepartner – aufzulösen und den Erlös unter den Beteiligten aufzuteilen. Jeder Miteigentümer kann das Verfahren beim zuständigen Amtsgericht beantragen, unabhängig davon, ob die anderen zustimmen.</p>

<h2>Warum das Ergebnis oft schlechter ausfällt als ein normaler Verkauf</h2>
<p>Der zentrale Nachteil: Bei einer Versteigerung entscheidet allein das Meistgebot am Termin, nicht der tatsächliche Marktwert. Interessenten wissen, dass sie eine Immobilie oft nicht besichtigen konnten wie bei einem regulären Verkauf, und kalkulieren entsprechend vorsichtig. In der Praxis werden dadurch häufig Preise erzielt, die spürbar unter dem liegen, was ein freihändiger Verkauf am offenen Markt eingebracht hätte – zusätzlich zu den Verfahrenskosten, die vom Erlös abgehen.</p>

<h2>Wie lange das Verfahren dauert</h2>
<p>Von der Antragstellung bis zum Versteigerungstermin vergehen in der Praxis häufig zwölf bis 24 Monate, je nach Auslastung des zuständigen Amtsgerichts und eventuellen Einwänden der Beteiligten. Das Gericht muss zunächst den Verkehrswert durch einen Sachverständigen feststellen lassen; im Versteigerungstermin selbst gelten dann feste Wertgrenzen – ein Gebot unter 5/10 des festgestellten Werts wird von Gesetzes wegen zurückgewiesen, unter 7/10 kann es auf Antrag eines Beteiligten ebenfalls versagt werden.</p>

<h2>Wie sich eine Teilungsversteigerung noch aufhalten lässt</h2>
<p>Nach § 180 Abs. 2 ZVG kann das Gericht das Verfahren auf Antrag eines Beteiligten einstweilen einstellen, wenn die Versteigerung für ihn zu diesem Zeitpunkt eine unbillige Härte bedeuten würde – etwa weil noch ernsthafte Verhandlungen über einen freihändigen Verkauf laufen. Der Antrag muss innerhalb von zwei Wochen nach Zustellung des Versteigerungsbeschlusses gestellt werden, die Einstellung ist auf sechs Monate begrenzt und in der Regel höchstens zweimal wiederholbar. Sie verschafft also Zeit – löst den eigentlichen Konflikt aber nicht.</p>

<h2>Der sinnvolle erste Schritt</h2>
<p>In den allermeisten Fällen lohnt es sich, vor einem Antrag auf Teilungsversteigerung noch einmal ernsthaft über einen einvernehmlichen Verkauf zu sprechen – idealerweise mit einer neutralen Werteinschätzung als gemeinsamer Diskussionsgrundlage. Ein regulärer Verkauf zum realistischen Marktwert bringt fast immer mehr für alle Beteiligten als das Ergebnis einer Versteigerung. Ich helfe in solchen Situationen gerne mit einer kostenlosen Ersteinschätzung und, wenn gewünscht, als vermittelnder Ansprechpartner für alle Miteigentümer.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/zvg/__180.html" target="_blank" rel="noopener">§ 180 ZVG – Teilungsversteigerung, einstweilige Einstellung (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/zvg/__181.html" target="_blank" rel="noopener">§ 181 ZVG – Anordnung der Teilungsversteigerung (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/zvg/__85a.html" target="_blank" rel="noopener">§ 85a ZVG – Wertgrenzen im Versteigerungstermin (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'nachlassimmobilie-vermieten-oder-verkaufen',
  'Geerbte Immobilie vermieten oder verkaufen? Was bei der Entscheidung wirklich zählt',
  'Nach einem Erbfall stellt sich fast immer dieselbe Frage: behalten und vermieten, oder verkaufen? Die Antwort hängt stark von der Zehn-Jahres-Frist der Spekulationssteuer und der eigenen Lebenssituation ab.',
  'Vermieten oder verkaufen nach dem Erbfall: wie die Spekulationsfrist nach § 23 EStG bei geerbten Immobilien läuft, wann ein Verkauf steuerfrei ist und welche weiteren Faktoren in die Entscheidung gehören.',
  $html$<p>Nach einem Erbfall stellt sich für die meisten Erben früher oder später dieselbe Frage: Behalte ich die Immobilie und vermiete sie, oder verkaufe ich? Eine pauschale Antwort gibt es nicht – aber es gibt einige Faktoren, die die Entscheidung in der Praxis stark beeinflussen, allen voran die steuerliche Behandlung.</p>

<h2>Die Zehn-Jahres-Frist der Spekulationssteuer</h2>
<p>Zentral ist § 23 Einkommensteuergesetz (EStG): Verkaufen Sie eine Immobilie innerhalb von zehn Jahren nach der Anschaffung mit Gewinn, unterliegt dieser Gewinn der sogenannten Spekulationssteuer – besteuert mit Ihrem persönlichen Einkommensteuersatz. Wichtig bei geerbten Immobilien: Die Frist beginnt nicht neu mit dem Erbfall, sondern läuft ab dem Zeitpunkt, zu dem der Erblasser die Immobilie ursprünglich erworben hat. Hat der Erblasser das Haus vor mehr als zehn Jahren gekauft, ist ein Verkauf durch die Erben in der Regel steuerfrei möglich – unabhängig davon, wie lange die Erben selbst schon Eigentümer sind.</p>

<h2>Die Ausnahme bei Eigennutzung</h2>
<p>Auch innerhalb der Zehn-Jahres-Frist entfällt die Spekulationssteuer, wenn die Immobilie im Verkaufsjahr und in den beiden vorangegangenen Jahren durchgehend zu eigenen Wohnzwecken genutzt wurde – sei es vom Erblasser selbst oder von den Erben. Wurde die Immobilie hingegen vermietet, bleibt der Gewinn bei einem Verkauf vor Ablauf der zehn Jahre steuerpflichtig, und die ursprüngliche Frist des Erblassers läuft für die Erben einfach weiter.</p>

<h2>Was für das Vermieten spricht</h2>
<p>Vermieten kann sinnvoll sein, wenn die Immobilie in guter Lage liegt, keine größeren Sanierungen ansteht und Sie regelmäßige Mieteinnahmen als langfristige Kapitalanlage schätzen. Zu bedenken ist allerdings der Aufwand: Vermietung bedeutet Mieterauswahl, laufende Verwaltung, Instandhaltungspflichten und im Erbengemeinschaftsfall zusätzlich die Notwendigkeit, sich mit den anderen Erben über die Verwaltung zu einigen.</p>

<h2>Was für den Verkauf spricht</h2>
<p>Ein Verkauf bietet sofortige Liquidität, ohne die laufenden Sammlungs- und Verwaltungspflichten eines Vermieters. Gerade wenn eine Immobilie weit vom eigenen Wohnort entfernt liegt, Sanierungsbedarf besteht oder mehrere Erben unterschiedliche Vorstellungen haben, ist der Verkauf häufig der pragmatischere Weg – zumal er, wie oben beschrieben, bei den meisten geerbten Immobilien ohnehin steuerfrei möglich ist.</p>

<h2>Der sinnvolle erste Schritt</h2>
<p>Bevor Sie sich zwischen Vermieten und Verkaufen entscheiden, lohnt sich eine realistische Werteinschätzung als Grundlage – sie zeigt Ihnen, welchen Betrag ein Verkauf tatsächlich einbringen würde, den Sie dann einer geschätzten Mietrendite gegenüberstellen können. Für die konkrete steuerliche Einordnung Ihres Einzelfalls empfehle ich zusätzlich ein Gespräch mit einem Steuerberater. Die Werteinschätzung dafür können Sie kostenlos und unverbindlich bei mir anfordern.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/estg/__23.html" target="_blank" rel="noopener">§ 23 EStG – Private Veräußerungsgeschäfte (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, meta_description, content_html, published)
values (
  'scheidungsimmobilie-haus-bei-scheidung',
  'Das gemeinsame Haus bei einer Scheidung: Was mit der Immobilie passiert',
  'Wem gehört das Haus nach einer Scheidung? Meist keinem allein – es geht um einen Geldausgleich, nicht um automatische Miteigentumsanteile. Ein Überblick über Zugewinnausgleich und die praktischen Optionen.',
  'Was mit einer gemeinsamen Immobilie bei einer Scheidung passiert: Zugewinnausgleich nach § 1378 BGB, die Sonderrolle geerbter Immobilien, und die drei praktischen Optionen Verkauf, Auszahlung oder Vermietung.',
  $html$<p>„Was passiert mit unserem Haus, wenn wir uns scheiden lassen?" ist eine der ersten Fragen, die sich trennende Paare stellen – verständlich, denn oft ist die Immobilie der größte gemeinsame Vermögenswert. Die Antwort überrascht viele: Ein Haus wird bei einer Scheidung nicht automatisch aufgeteilt. Es geht um einen finanziellen Ausgleich.</p>

<h2>Der gesetzliche Regelfall: die Zugewinngemeinschaft</h2>
<p>Wer in Deutschland heiratet, ohne einen Ehevertrag zu schließen, lebt automatisch im gesetzlichen Güterstand der Zugewinngemeinschaft (§ 1363 BGB). Das bedeutet: Jeder Ehepartner bleibt während der Ehe Eigentümer seines eigenen Vermögens – es entsteht kein gemeinsamer Topf. Steht das Haus im Alleineigentum eines Partners, bleibt er auch nach der Scheidung Alleineigentümer. Steht es im gemeinsamen Eigentum beider (das ist bei der Familienimmobilie häufig der Fall), bleiben auch nach der Scheidung zunächst beide Miteigentümer – bis eine Einigung oder ein Gerichtsverfahren etwas anderes regelt.</p>

<h2>Was der Zugewinnausgleich mit dem Haus zu tun hat</h2>
<p>Bei der Scheidung wird nach § 1378 BGB der während der Ehe erzielte Zugewinn beider Partner verglichen; wer den höheren Zugewinn erzielt hat, muss die Hälfte der Differenz als Geldbetrag an den anderen auszahlen. Das Haus selbst wird dabei nicht geteilt, sondern nur sein Wert fließt in die Berechnung ein – der Zugewinnausgleich ist ein reiner Geldanspruch, kein Anspruch auf einen Miteigentumsanteil.</p>

<h2>Die Sonderrolle geerbter oder geschenkter Immobilien</h2>
<p>Hat ein Ehepartner die Immobilie während der Ehe geerbt oder geschenkt bekommen, zählt dieser Wert nach § 1374 Abs. 2 BGB nicht zum auszugleichenden Zugewinn – er wird stattdessen rechnerisch dem Anfangsvermögen zugerechnet und bleibt so weitgehend außen vor. Eine wichtige Einschränkung: Wurde die geerbte Immobilie während der Ehe saniert oder modernisiert, fließt zumindest diese Wertsteigerung in den Zugewinnausgleich ein.</p>

<h2>Die drei praktischen Optionen für das gemeinsame Haus</h2>
<ul>
<li><strong>Verkauf und Aufteilung des Erlöses:</strong> Der klarste Weg – beide Partner erhalten ihren Anteil in bar, ohne dauerhafte finanzielle Verbindung zueinander.</li>
<li><strong>Auszahlung durch einen Partner:</strong> Ein Ehepartner übernimmt das Haus vollständig und zahlt dem anderen dessen Anteil am Wert aus, oft in Verbindung mit einer Umschuldung der laufenden Finanzierung.</li>
<li><strong>Vermietung mit Aufteilung der Mieteinnahmen:</strong> Seltener, aber möglich, wenn beide sich langfristig als Miteigentümer arrangieren – erfordert allerdings eine funktionierende Verständigung, die nach einer Scheidung nicht immer gegeben ist.</li>
</ul>

<h2>Der sinnvolle erste Schritt</h2>
<p>In jedem der drei Szenarien braucht es zunächst einen realistischen, von beiden Seiten akzeptierten Immobilienwert – ohne ihn lässt sich weder ein fairer Verkaufspreis noch eine faire Auszahlungssumme oder ein korrekter Zugewinnausgleich berechnen. Eine neutrale, kostenlose Ersteinschätzung ist dafür oft der erste sinnvolle Schritt, bevor Anwälte oder Notare eingeschaltet werden. Für die rechtliche Seite der Scheidung selbst empfehle ich zusätzlich den Rat eines Fachanwalts für Familienrecht.</p>

<h3>Quellen</h3>
<ul>
<li><a href="https://www.gesetze-im-internet.de/bgb/__1363.html" target="_blank" rel="noopener">§ 1363 BGB – Zugewinngemeinschaft (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bgb/__1374.html" target="_blank" rel="noopener">§ 1374 BGB – Anfangsvermögen (gesetze-im-internet.de)</a></li>
<li><a href="https://www.gesetze-im-internet.de/bgb/__1378.html" target="_blank" rel="noopener">§ 1378 BGB – Ausgleichsforderung (gesetze-im-internet.de)</a></li>
</ul>$html$,
  true
)
on conflict (slug) do nothing;
