Jest to mój największy projekt 2016 roku. Strona z dużym potencjałem na dodawanie nowych funkcji.
*Aktualnie nie jest w użytku, stworzona na potrzeby portfolio i własnego rozwoju.*

![alt text](http://i.imgur.com/MDoHyxm.gif "Strona główna")

---

Głównym celem jest zabawa związana z różnymi sposobami wygrywania gier komputerowych (choć nie trzeba się do nich ograniczać). Aktualnie pracę skończyłem na działającym sklepie ze "skrzyniami", z których można wylosować różne gry. W zamyśle było dodanie wiele dodatkowych form walki o nagrody, np koło fortuny, jackpot, różne minigry. 

---

Strona niemalże w całości oparta jest o asynchroniczne ładowanie treści, dzięki temu można odnieść wrażenie iż jest to spójna "aplikacja", nie jesteśmy co kliknięcie przenoszeni na nową podstronę.

![alt text](http://i.imgur.com/Vj9ci1R.gif "Ładowanie podstron z wykorzystaniem AJAX")

---

##Logowanie i rejestracja

![alt text](http://i.imgur.com/tcnyima.gif "Logowanie i rejestracja")

##Kody referencyjne

Istnieje możliwość dodania nieograniczonej ilości kodów referencyjnych, dzięki którym możemy przekazać dowolne nagrody użytkownikom.

![alt text](http://i.imgur.com/o14VrVe.gif "Kody referencyjne")

##Metody dodawania środków

Działające płatności z wykorzystaniem systemów *przelewy24.pl* oraz *microsms.pl* (SMS, Przelew bankowy, PaySafeCard). 

![alt text](http://i.imgur.com/ZXZkpxC.gif "Kody referencyjne")

##Zarządzanie ekwipunkiem

Posiadane w ekwipunku gry można odsprzedać za połowę ich wartości lub odebrać wygraną w postaci klucza do gry. 

![alt text](http://i.imgur.com/s9v6Xs8.gif "Zarządzanie ekwipunkiem")

##Sklep i losowanie gier

Do sklepu można dodać nieograniczoną liczbę "skrzyń" / pakietów z dowolnymi kombinacjami gier do wylosowania. 
Losowane gry wybierane są na podzstawie procentowych szans ustalonych przy dodawaniu nowej skrzyni. Animacja otwierania skrzyni również jest losowa, wskaźnik nigdy nie zatrzymuje się w tym samym miejscu.

![alt text](http://i.imgur.com/m4Dgkm0.gif "Sklep")

![alt text](http://i.imgur.com/cxFDp0A.gif "Losowanie")

##Chatbox

Strona posiada również prosty chatbox działający w czasie rzeczywistym, który umożliwia użytkownikom komunikowanie się. Administratorzy są odpowiednio wyróżnieni innym kolorem, mają oni również możliwość zablokowania poszczególnych użytkowników na czacie. 

![alt text](http://i.imgur.com/JJ1Zijt.gif "Chatbox")

##Panel adminisratora

![alt text](http://i.imgur.com/U07iy8R.gif "Panel admina")

Z poziomu panelu administratora mamy dostęp do: 
* sprawdzenia liczby aktualnie zalogowanych użytkowników
* dodania nowego postu w aktualnościach
* dodania nowej skrzyni z dowolną zawartością i procentowo ustalonymi szansami na wylosowanie (+ podgląd generowaniej skrzyni)
* dodania nowej gry do bazy danych

![alt text](http://i.imgur.com/rvh2Y7O.gif "Dodawanie nowej skrzyni")

##Strona z FAQ

![alt text](http://i.imgur.com/7Y1dFID.gif "FAQ")

---

###Przykłady zaimplementowanych funkcji: 
* Formularze rejestracji i logowania + potwierdzenia email
* Odzyskiwanie hasła
* Asynchroniczne ładowanie treści na stronie
* Aktualności (dodawanie i usuwanie z poziomu strony)
* Sklep (dodawanie i usuwanie skrzyń z poziomu strony)
* Starannie utworzona metoda losowości wybierania gier (na podstawie określonych % szans) i przebiegu animacji otwierania skrzyń
* Witrualny portfel + różne metody płatności (SMS, Przelew, PSC)
* System kodów referencyjnych
* Ekwipunek i zarządzanie nim (odsprzedaż gier / odbieranie kodów)
* Formularz kontaktowy
* Czat w czasie rzeczywistym
* Panel administratora (licznik zalogowanych użytkowników, dodawanie aktualności, skrzyń do sklepu, gier do bazy danych)
* Strona FAQ
* Automatyczne wylogowanie użytkownika po określonym czasie braku aktywności na stronie (w celu zachowania bezpieczeństwa)

![alt text](http://i.imgur.com/atYM0gD.gif "Automatyczne wylogowanie")

---

###Stworzono z wykorzystaniem: 
* HTML
* CSS3
* JavaScript / jQuery
* AJAX
* PHP
* MySQL
* velocity.js

---

![alt text](http://i.imgur.com/iJd2pDZ.gif "Wylogowanie")
