### Podstawy TypeScript w Node.js
- współdzielone DTO
- `Result<T>` jako typ zwracany w warstwie domeny
- zawężanie typów podczas walidacji danych wejściowych
- konfiguracja środowiska ESM

### Dekoratory i metadane w TypeScript
- budowa lekkiego, niestandardowego mini-frameworka HTTP: `@Controller()`, `@Inject()`
- integracja z Reflect Metadata
- automatyczna rejestracja endpointów za pomocą dekoratorów

### Zaawansowana asynchroniczność: Event Loop, Streamy, Backpressure
- dogłębna analiza pętli zdarzeń (event loop) w Node.js
- obsługa dużych plików za pomocą strumieni
- strategie radzenia sobie z backpressure

### Worker Threads: przetwarzanie plików w tle
- `FileProcessingWorker` (worker thread)
- przesyłanie buforów plików do workerów
- komunikacja: statusy, progres, błędy
- `structuredClone` i transferable objects

### Architektura: Clean Architecture, DI, Ports & Adapters
- Application – Domain – Infrastructure
- wprowadzenie do architektury warstwowej

### Wzorce projektowe w praktyce
- Command pattern dla operacji domenowych
- Factory pattern dla tworzenia workerów
- Observer/EventEmitter dla lokalnych zdarzeń przetwarzania
- Adapter pattern dla warstwy przechowywania plików

### WebSockety: realtime processing progress
- implementacja serwera WebSocket
- powiązanie WebSocketów z workerami
- rozgłaszanie aktualizacji do klientów frontendowych

### Wydajność i diagnostyka
- CPU & heap profiling
- analiza event loop
- symulacja wycieku pamięci w workerze

### Bezpieczeństwo
- sanitizacja danych wejściowych
- walidacja żądań za pomocą dekoratorów
- tokeny uwierzytelniające
- ograniczanie liczby żądań (rate limiting)
- separacja sekretów i konfiguracji