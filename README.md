# Yorkie JavaScript SDK

The Yorkie JavaScript SDK implements the client-side libraries.

To get started using Yorkie JavaScript SDK, see: https://yorkie.dev/docs/master/js-sdk

### How yorkie-js-sdk works

yorkie-js-sdk uses gRPC-web for communicating with Yorkie agent built on gRPC.

```
 +--Browser--+           +--Envoy---------+         +--Yorkie-----+
 |           |           |                |         |             |
 | gRPC-web  <- HTTP1.1 -> gRPC-web proxy <- HTTP2 -> gRPC server |
 |           |           |                |         |             |
 +-----------+           +----------------+         +-------------+
```

For more details: https://grpc.io/blog/state-of-grpc-web/

## For contributing

### Build yorkie-js-sdk

```bash
# install packages
npm install

# build
npm run build
```

For generating proto messages and the service client stub classes with protoc and the protoc-gen-grpc-web.

How to install protoc-gen-grpc-web: https://github.com/grpc/grpc-web#code-generator-plugin

```bash
# generate proto messages and the service client stub classes
npm run build:proto
```

### Precommit Hooks

As part of this repo, we use [Husky](https://github.com/typicode/husky) to implement git hooks. We leverage the prepush hook to do below things:

 - Automated code styling (using [Prettier](https://github.com/prettier/prettier))

### Test yorkie-js-sdk with Envoy, Yorkie and MongoDB.

Start MongoDB, Yorkie and Envoy proxy in a terminal session.

```bash
cd docker
docker-compose up
```

Start the test in another terminal session.

```bash
npm run test
```

### Test co-editing example with CodeMirror

Start MongoDB, Yorkie and Envoy proxy in a terminal session.

```bash
cd docker
docker-compose up
```

Start the test in another terminal session.

```bash
npm run start
```
