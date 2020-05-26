# Text Share

## Aufgabe

Erstelle eine Web-Anwendung, das den Usern erlaubt, Text-Schnipsel auf schnelle Weise erstellen, bearbeiten und teilen zu können.

## Epics

### Ich möchte von verschiedenen Geräten Textschnipsel speichern und bearbeiten können {MVP}
* Anfänglich: Einzeilige Texte
* Ziel: Mehrzeilige Texte
* Textgröße darf limitiert sein
* Persistent
* Single Person oder Mandantenfähig
* Erfordert, das es als Anwendung läuft

### Ich möchte nach Schnipseln suchen können {TOP}
* Vorschlag wäre eine Volltextsuche

### Ich möchte Schnipsel mit anderen Kollegen teilen können {TOP}
* Runs on server (siehe iteratec-VM, Digital Ocean, Heroku)
* Keine Authorisierung zwingend notwendig
* Authentisierung ODER Security by Obscurity
* Autor mit abspeichern (create, update)

### Ich möchte Textschnipsel komfortabel eingeben können {HIGH}
* Graphisches Frontend

### Schnipsel müssen formatierbat sein, da ich auch Links, Listen etc. verwalten möchte {HIGH}
* Textformatierung, z.B. Markdown, AsciiDoc
* Google danach

### Ich will Schnipsel auch im Zug ohne Internet bearbeiten können {MEDIUM}
* Anfänglich: Schnipsel weiter lesen können
* Ziel: Auch schreiben können
* Verwende z.B. IndexDB oder LocalStorage

### Ich muss einen Schnipsel auch mal schnell von der Kommandozeile aus hinzufügen oer ändern können {MEDIUM}
* ReST
* Kann auch XML, SOAP, Hessian oder eine CLI sein. 

### Eine mobile Anwendung für unterwegs wäre echt cool {LOW}
* Responsive

### Ich möchte Schnipsel mit Tags versehen können {LOW}
* Zum Beispiel hier HIGH/MEDIUM/LOW usw.

## Forderungen

1. Präsentiere die Anwendung
2. Verteidige die Architektur (mindestens ein Kontextdiagramm)
3. Schreibe Unit-, Integrations- und Smoketests

## Hinweise

1. 20 Stunden für die Basisanwendung und die Diagramme
2. Nachfragen, nachfragen, nachfragen
3. Keine goldenen Griffe!

## Server

* iteraShift
* VM
* Heroku
* Digital Ocean
* AWS
* Google Cloud
* Home Server
* ...
 