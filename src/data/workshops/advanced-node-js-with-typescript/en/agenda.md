### TypeScript Foundations for the Project
- shared DTOs
- Result<T> as a return type for domain layers
- type narrowing in input validation
- ESM configuration

### TypeScript Decorators + Metadata
- building a lightweight custom HTTP mini-framework: @Controller(), @Inject()
- Reflect Metadata integration
- automatic endpoint registration using decorators

### Advanced Async: Event Loop, Streams, Backpressure
- deep dive into the Node.js event loop
- handling large file uploads with streams
- backpressure strategies

### Worker Threads: Background File Processing
- FileProcessingWorker (worker thread)
- transferring file buffers to workers
- communication: status updates, progress, errors
- structuredClone + transferable objects

### Architecture: Clean, DI, Ports & Adapters
- Application - Domain - Infrastructure
- introduction of layered architecture

### Design Patterns in Practice
- Command pattern for domain operations
- Factory pattern for worker creation
- Observer/EventEmitter for local processing events
- Adapter pattern for file storage layer

### WebSockets: Realtime Processing Progress
- implementing a WebSocket server
- connecting WebSockets with worker threads
- broadcasting updates to frontend clients

### Performance & Debugging
- CPU & heap profiling
- event loop analysis
- mock memory leak inside a worker thread

### Security
- input sanitization
- request validation using decorators
- auth token
- rate limiting
- secrets & configuration separation