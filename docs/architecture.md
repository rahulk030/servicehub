# Architecture

ServiceHub separates transport, workflow, and persistence concerns. Route handlers validate HTTP input while ticket-domain functions own status-transition and SLA rules. MongoDB is accessed through a repository interface so domain and API tests can use an in-memory implementation.

The client uses Pinia for queue state and filters. Authentication is deliberately isolated behind middleware, making it possible to replace the local demo principal with JWT/OIDC without coupling identity-provider details to ticket workflow code.
