"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface TokenTag {
  token: string;
  tag: string;
}

export default function TokenTagger() {
  const [token, setToken] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<TokenTag[]>([]);
  const [error, setError] = useState<string>("");

  const addTag = () => {
    if (!token.trim() || !tag.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setTags((prev) => [...prev, { token: token.trim(), tag: tag.trim() }]);
    setToken("");
    setTag("");
    setError("");
  };

  const deleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTags([]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="grid gap-2">
        <label htmlFor="token" className="text-sm font-medium">
          Token Name
        </label>
        <Input
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token name"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="tag" className="text-sm font-medium">
          Tag
        </label>
        <Input
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <Button onClick={addTag} className="w-full">
        Add Tag
      </Button>

      {tags.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Tagged Tokens</h2>
          <ul className="space-y-2">
            {tags.map((t, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-muted p-2 rounded"
              >
                <span>
                  <strong>{t.token}</strong>: {t.tag}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteTag(idx)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button
            variant="destructive"
            className="mt-4 w-full"
            onClick={clearAll}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
