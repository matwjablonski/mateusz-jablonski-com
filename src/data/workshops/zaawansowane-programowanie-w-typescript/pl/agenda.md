### Wprowadzenie do TypeScript
- Czym jest TypeScript?
- Podstawy konfiguracji projektu TypeScript:
- Instalacja typescript za pomocą npm
- Tworzenie pliku tsconfig.json i jego konfiguracja (np. ustawienia strict, noImplicitAny, target, module)
- Omówienie kompilacji TypeScript do JavaScriptu i mapowanie kodu źródłowego
- TypeScript vs JavaScript

### System Typów w TypeScript
- Podstawowe typy danych oraz ich poprawne zastosowanie
- Złożone typy:
- Tablice, krotki (tuples), typy wyliczeniowe (enum)
- Typy funkcji: Opisywanie sygnatur funkcji, przeciążanie funkcji, this w funkcjach oraz funkcje strzałkowe
- Obiekty i interfejsy:
- Jak definiować i używać interfejsów (interface) oraz typów (type) do opisania struktury danych
- Różnice między interface a type – kiedy lepiej używać jednego, a kiedy drugiego
- Readonly i const – jak wprowadzać niemutowalne obiekty
- Generyki (typy ogólne)
- Zaawansowane typy:
- Union Types i Intersection Types
- Typy warunkowe

### Wnioskowanie typów
- Mechanizm wnoskowania typów
- Zawężanie typów (Type Narrowing)
- Kontrola przepływu i zaawansowane konstrukcje

### Projektowanie typów
- Tworzenie czytelnych i bezpiecznych typów
- Modularyzacja typów i ponowne ich użycie
- Interfejsy i relacje między typami

### Klasy i programowanie obiektowe w TypeScript
- Definiowanie klas i dziedziczenie:
- Podstawy klas w TypeScript
- Jak TypeScript wspiera dziedziczenie, polimorfizm oraz enkapsulację
- Abstrakcje i interfejsy:
- Kiedy używać klas abstrakcyjnych i interfejsów
- Przykłady bardziej zaawansowanego wykorzystania interfejsów w kodzie obiektowym
- Modyfikatory dostępu:
- Jak kontrolować dostępność pól i metod za pomocą public, protected, private.
- Wprowadzenie readonly w kontekście klas, aby zapewnić niemutowalność pól

### Dobre praktyki
- Bezpieczne obsługiwanie błędów w TypeScript:
- Jak pisać typowo bezpieczne konstrukcje try-catch
- Typowanie wyjątków i tworzenie precyzyjnych komunikatów błędów
- Obsługa asynchroniczności:
- Zastosowanie typów w kontekście async i await
- Używanie Promise, a także korzyści płynące z typowania w operacjach asynchronicznych
- Testowanie w TypeScript
- Typowanie bibliotek zewnętrznych
