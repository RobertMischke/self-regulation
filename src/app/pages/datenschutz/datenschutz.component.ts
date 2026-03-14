import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white text-slate-900">
      <div class="mx-auto max-w-3xl px-6 py-16 sm:py-24">

        <a routerLink="/" class="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          &larr; Zur&uuml;ck zur Startseite
        </a>

        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Datenschutzerkl&auml;rung</h1>

        <!-- 1. Datenschutz auf einen Blick -->
        <h2 class="mt-12 text-xl font-bold">1. Datenschutz auf einen Blick</h2>

        <h3 class="mt-6 text-lg font-bold">Allgemeine Hinweise</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
          sind alle Daten, mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
          Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
          Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
        </p>

        <h3 class="mt-8 text-lg font-bold">Datenerfassung auf dieser Website</h3>

        <h4 class="mt-4 text-sm font-bold text-slate-700">Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?</h4>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
          Kontaktdaten k&ouml;nnen Sie dem Abschnitt &bdquo;Hinweis zur Verantwortlichen
          Stelle&ldquo; in dieser Datenschutzerkl&auml;rung entnehmen.
        </p>

        <h4 class="mt-4 text-sm font-bold text-slate-700">Wie erfassen wir Ihre Daten?</h4>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann
          es sich z.&nbsp;B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website
          durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B.
          Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser
          Daten erfolgt automatisch, sobald Sie diese Website betreten.
        </p>

        <h4 class="mt-4 text-sm font-bold text-slate-700">Wof&uuml;r nutzen wir Ihre Daten?</h4>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
          gew&auml;hrleisten. Andere Daten k&ouml;nnen zur Analyse Ihres Nutzerverhaltens
          verwendet werden. Sofern &uuml;ber die Website Vertr&auml;ge geschlossen oder angebahnt
          werden k&ouml;nnen, werden die &uuml;bermittelten Daten auch f&uuml;r
          Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
        </p>

        <h4 class="mt-4 text-sm font-bold text-slate-700">Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?</h4>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft, Empf&auml;nger
          und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben au&szlig;erdem
          ein Recht, die Berichtigung oder L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine
          Einwilligung zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
          jederzeit f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das Recht, unter
          bestimmten Umst&auml;nden die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen
          Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen
          Aufsichtsbeh&ouml;rde zu.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie sich jederzeit an uns wenden.
        </p>

        <!-- 2. Hosting -->
        <h2 class="mt-12 border-t border-slate-100 pt-8 text-xl font-bold">2. Hosting</h2>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
        </p>

        <h3 class="mt-6 text-lg font-bold">Hetzner</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend Hetzner).
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Details entnehmen Sie der Datenschutzerkl&auml;rung von Hetzner:
          <a href="https://www.hetzner.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer"
             class="text-indigo-600 hover:underline">https://www.hetzner.com/de/legal/privacy-policy/</a>.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          Wir haben ein berechtigtes Interesse an einer m&ouml;glichst zuverl&auml;ssigen Darstellung
          unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
          Verarbeitung ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
          &sect; 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den
          Zugriff auf Informationen im Endger&auml;t des Nutzers (z.&nbsp;B. Device-Fingerprinting)
          im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
        </p>

        <!-- 3. Allgemeine Hinweise und Pflichtinformationen -->
        <h2 class="mt-12 border-t border-slate-100 pt-8 text-xl font-bold">3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <h3 class="mt-6 text-lg font-bold">Datenschutz</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst.
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
          Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
          Personenbezogene Daten sind Daten, mit denen Sie pers&ouml;nlich identifiziert werden
          k&ouml;nnen. Die vorliegende Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir
          erheben und wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem Zweck
          das geschieht.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z.&nbsp;B. bei der
          Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser
          Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.
        </p>

        <h3 class="mt-8 text-lg font-bold">Hinweis zur verantwortlichen Stelle</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser Website ist:
        </p>
        <address class="mt-3 text-sm not-italic leading-7 text-slate-600">
          Robert Mischke<br>
          Warschauer Str. 62<br>
          10243 Berlin
        </address>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Telefon: 0178 18 668 48<br>
          E-Mail: robertmischke&#64;gmail.com
        </p>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person, die allein oder
          gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von
          personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o. &Auml;.) entscheidet.
        </p>

        <h3 class="mt-8 text-lg font-bold">Speicherdauer</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere Speicherdauer genannt
          wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck f&uuml;r die
          Datenverarbeitung entf&auml;llt. Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen
          oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht,
          sofern wir keine anderen rechtlich zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung
          Ihrer personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche
          Aufbewahrungsfristen); im letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall
          dieser Gr&uuml;nde.
        </p>

        <h3 class="mt-8 text-lg font-bold">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
          personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9
          Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO
          verarbeitet werden. Im Falle einer ausdr&uuml;cklichen Einwilligung in die
          &Uuml;bertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung
          au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
          Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endger&auml;t
          (z.&nbsp;B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung
          zus&auml;tzlich auf Grundlage von &sect; 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit
          widerrufbar. Sind Ihre Daten zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung
          vorvertraglicher Ma&szlig;nahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage
          des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur
          Erf&uuml;llung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6
          Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten
          Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. &Uuml;ber die jeweils im Einzelfall
          einschl&auml;gigen Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser
          Datenschutzerkl&auml;rung informiert.
        </p>

        <h3 class="mt-8 text-lg font-bold">Empf&auml;nger von personenbezogenen Daten</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Im Rahmen unserer Gesch&auml;ftst&auml;tigkeit arbeiten wir mit verschiedenen externen
          Stellen zusammen. Dabei ist teilweise auch eine &Uuml;bermittlung von personenbezogenen
          Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an
          externe Stellen weiter, wenn dies im Rahmen einer Vertragserf&uuml;llung erforderlich ist,
          wenn wir gesetzlich hierzu verpflichtet sind (z.&nbsp;B. Weitergabe von Daten an
          Steuerbeh&ouml;rden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO
          an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe
          erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer
          Kunden nur auf Grundlage eines g&uuml;ltigen Vertrags &uuml;ber Auftragsverarbeitung
          weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag &uuml;ber gemeinsame
          Verarbeitung geschlossen.
        </p>

        <h3 class="mt-8 text-lg font-bold">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer ausdr&uuml;cklichen Einwilligung
          m&ouml;glich. Sie k&ouml;nnen eine bereits erteilte Einwilligung jederzeit widerrufen. Die
          Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
          Widerruf unber&uuml;hrt.
        </p>

        <h3 class="mt-8 text-lg font-bold">Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
        <div class="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium uppercase leading-7 text-slate-700">
          <p>
            Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
            haben Sie jederzeit das Recht, aus Gr&uuml;nden, die sich aus Ihrer besonderen Situation
            ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen;
            dies gilt auch f&uuml;r ein auf diese Bestimmungen gest&uuml;tztes Profiling. Die
            jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser
            Datenschutzerkl&auml;rung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
            personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir k&ouml;nnen zwingende
            schutzw&uuml;rdige Gr&uuml;nde f&uuml;r die Verarbeitung nachweisen, die Ihre
            Interessen, Rechte und Freiheiten &uuml;berwiegen oder die Verarbeitung dient der
            Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen (Widerspruch
            nach Art. 21 Abs. 1 DSGVO).
          </p>
          <p class="mt-3">
            Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben
            Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender
            personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch f&uuml;r
            das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie
            widersprechen, werden Ihre personenbezogenen Daten anschliessend nicht mehr zum Zwecke
            der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).
          </p>
        </div>

        <h3 class="mt-8 text-lg font-bold">Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen ein Beschwerderecht
          bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen
          Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es zu.
          Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
          gerichtlicher Rechtsbehelfe.
        </p>

        <h3 class="mt-8 text-lg font-bold">Recht auf Daten&uuml;bertragbarkeit</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erf&uuml;llung
          eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen,
          maschinenlesbaren Format aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung
          der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch
          machbar ist.
        </p>

        <h3 class="mt-8 text-lg font-bold">Auskunft, Berichtigung und L&ouml;schung</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
          unentgeltliche Auskunft &uuml;ber Ihre gespeicherten personenbezogenen Daten, deren
          Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
          Berichtigung oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
          personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
        </p>

        <h3 class="mt-8 text-lg font-bold">Recht auf Einschr&auml;nkung der Verarbeitung</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten
          zu verlangen. Hierzu k&ouml;nnen Sie sich jederzeit an uns wenden. Das Recht auf
          Einschr&auml;nkung der Verarbeitung besteht in folgenden F&auml;llen:
        </p>
        <ul class="mt-3 list-inside list-disc space-y-2 text-sm leading-7 text-slate-600">
          <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
            ben&ouml;tigen wir in der Regel Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer
            der Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen.</li>
          <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtm&auml;&szlig;ig
            geschah/geschieht, k&ouml;nnen Sie statt der L&ouml;schung die Einschr&auml;nkung der
            Datenverarbeitung verlangen.</li>
          <li>Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie sie jedoch zur
            Aus&uuml;bung, Verteidigung oder Geltendmachung von Rechtsanspr&uuml;chen ben&ouml;tigen,
            haben Sie das Recht, statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung
            Ihrer personenbezogenen Daten zu verlangen.</li>
          <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine
            Abw&auml;gung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch
            nicht feststeht, wessen Interessen &uuml;berwiegen, haben Sie das Recht, die
            Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        </ul>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschr&auml;nkt haben,
          d&uuml;rfen diese Daten &ndash; von ihrer Speicherung abgesehen &ndash; nur mit Ihrer
          Einwilligung oder zur Geltendmachung, Aus&uuml;bung oder Verteidigung von
          Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen nat&uuml;rlichen oder
          juristischen Person oder aus Gr&uuml;nden eines wichtigen &ouml;ffentlichen Interesses
          der Europ&auml;ischen Union oder eines Mitgliedstaats verarbeitet werden.
        </p>

        <h3 class="mt-8 text-lg font-bold">SSL- bzw. TLS-Verschl&uuml;sselung</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der &Uuml;bertragung
          vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als
          Seitenbetreiber senden, eine SSL- bzw. TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte
          Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo;
          auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die Daten, die Sie
          an uns &uuml;bermitteln, nicht von Dritten mitgelesen werden.
        </p>

        <h3 class="mt-8 text-lg font-bold">Widerspruch gegen Werbe-E-Mails</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten Kontaktdaten zur
          &Uuml;bersendung von nicht ausdr&uuml;cklich angeforderter Werbung und
          Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich
          ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten Zusendung von
          Werbeinformationen, etwa durch Spam-E-Mails, vor.
        </p>

        <!-- 4. Datenerfassung auf dieser Website -->
        <h2 class="mt-12 border-t border-slate-100 pt-8 text-xl font-bold">4. Datenerfassung auf dieser Website</h2>

        <h3 class="mt-6 text-lg font-bold">Anfrage per E-Mail, Telefon oder Telefax</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive
          aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der
          Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir
          nicht ohne Ihre Einwilligung weiter.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
          sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags zusammenh&auml;ngt oder zur
          Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen &uuml;brigen
          F&auml;llen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
          Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
          Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung
          ist jederzeit widerrufbar.
        </p>
        <p class="mt-2 text-sm leading-7 text-slate-600">
          Die von Ihnen an uns per Kontaktanfragen &uuml;bersandten Daten verbleiben bei uns, bis
          Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
          Zweck f&uuml;r die Datenspeicherung entf&auml;llt (z.&nbsp;B. nach abgeschlossener
          Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen &ndash; insbesondere
          gesetzliche Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.
        </p>

        <!-- Quelle -->
        <p class="mt-12 text-xs text-slate-400">
          Quelle:
          <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer"
             class="hover:underline">https://www.e-recht24.de</a>
        </p>

      </div>
    </div>
  `,
})
export class DatenschutzComponent {}
