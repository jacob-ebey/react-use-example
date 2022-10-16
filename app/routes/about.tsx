import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Suspense, experimental_use as use } from "react";

function delay<T = unknown>(value: T, ms: number) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}

export function loader() {
  return defer({
    first: delay("first", 1000),
    second: delay("second", 2000),
  });
}

function Message({ message }: { message: Promise<string> | string }) {
  let resolvedMessage = typeof message == "string" ? message : use(message);

  return <p>{resolvedMessage}</p>;
}

export default function About() {
  const { first, second } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>About</h1>
      <Link to="/">Home</Link>
      <Suspense fallback={<p>loading first...</p>}>
        <Message message={first} />
      </Suspense>
      <Suspense fallback={<p>loading second...</p>}>
        <Message message={second} />
      </Suspense>
    </div>
  );
}
