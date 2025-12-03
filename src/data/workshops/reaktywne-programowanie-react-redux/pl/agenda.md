### Wprowadzenie architektury opartej o Redux
- Omówienie unidirectional data flow w React
- Wyjaśnienie potrzeby zarządzania stanem globalnym w większych aplikacjach
- Wskazanie problemów wynikających z prop drilling i rozproszonego stanu

### Instalacja i konfiguracja Redux w aplikacji React
- Instalacja `redux` i `react-redux`
- Tworzenie folderu `store` oraz struktura aplikacji oparta na Reduxie
- Konfiguracja `store` i integracja z aplikacją za pomocą `Provider`

### Tworzenie reduktorów i akcji
- Definicja reduktora: czym jest reduktor i jak działa
- Tworzenie akcji, akcje synchroniczne i asynchroniczne
- Korzystanie z `combineReducers` dla zarządzania wieloma reduktorami

### Wykorzystanie selektorów i mapowanie stanu do komponentów
- Używanie funkcji `useSelector` do dostępu do globalnego stanu
- Mapowanie stanu do propsów przy użyciu `mapStateToProps`
- Przykłady selektorów obliczeniowych (memoizacja za pomocą `reselect`)

### Dispatch i modyfikacja stanu za pomocą akcji
- Korzystanie z `useDispatch` do wywoływania akcji w komponentach funkcyjnych
- Mapowanie akcji do propsów w komponentach klasowych z `mapDispatchToProps`
- Obsługa asynchronicznych operacji za pomocą `redux-thunk` lub `redux-saga`

### Middleware i rozszerzenia Reduxa
- Wprowadzenie do middleware: jak działa i do czego służy
- Korzystanie z `redux-logger` do debugowania
- Wprowadzenie i implementacja `redux-thunk` lub `redux-saga` do zarządzania efektami ubocznymi

### Organizacja dużych aplikacji z Reduxem
- Podział aplikacji na moduły: duck pattern i feature-based structure
- Dynamika ładowania reduktorów: lazy loading
- Zarządzanie złożonym stanem za pomocą normalizacji danych

### Debugowanie i testowanie aplikacji Redux
- Korzystanie z Redux DevTools do śledzenia zmian stanu i akcji
- Pisanie testów jednostkowych dla reducerów i akcji za pomocą `jest`
- Testowanie komponentów związanych z Reduxem z `react-testing-library`

### Optymalizacja wydajności aplikacji z Reduxem
- Używanie `React.memo` oraz `useMemo` do zapobiegania niepotrzebnym renderom
- Memoizacja selektorów przy pomocy `reselect`
- Analiza wydajności z użyciem narzędzi takich jak `why-did-you-render`

### Alternatywy dla Redux oraz przyszłość zarządzania stanem
- Krótkie wprowadzenie do Context API jako alternatywy dla Reduxa
- Inne biblioteki do zarządzania stanem, takie jak MobX lub Zustand
- Nowe trendy: Redux Toolkit i skrócenie boilerplate'u w Redux
