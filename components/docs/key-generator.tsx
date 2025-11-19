'use client';

import crypto from 'crypto';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

// Generate 32 random bytes (256 bits) and convert to a base64 string
function generateSecretKey(size: number) {
  return crypto.randomBytes(size).toString('base64');
}

export function KeyGenerator({ prefix = '', size }: { prefix?: string, size: number }) {
  const [key, setKey] = useState(() => generateSecretKey(size));
  const updateKey = () => setKey(generateSecretKey(size));

  return (
    <>
      <DynamicCodeBlock lang="bash" code={prefix + key}/>

      <Button className="my-4" onClick={updateKey}>
        Generate new key
      </Button>
    </>
  );
}
