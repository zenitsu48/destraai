import { streamSse } from "@continuedev/fetch";
import fetch from "node-fetch";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { LlmApiConfig } from "../index.js";
import { OpenAIApi } from "./OpenAI.js";
import { FimCreateParamsStreaming } from "./base.js";

export class MoonshotApi extends OpenAIApi {
  constructor(config: LlmApiConfig) {
    super(config);
    this.apiBase = "https://api.moonshot.cn/";
  }

  async *fimStream(
    body: FimCreateParamsStreaming,
  ): AsyncGenerator<ChatCompletionChunk, any, unknown> {
    const endpoint = new URL("v1/chat/completions", this.apiBase);
    const resp = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        model: body.model,
        messages: [
          {
            role: "user",
            content: body.prompt + "[fill]" + body.suffix,
          },
        ],
        max_tokens: body.max_tokens,
        temperature: body.temperature,
        top_p: body.top_p,
        frequency_penalty: body.frequency_penalty,
        presence_penalty: body.presence_penalty,
        stop: body.stop,
        stream: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    });

    for await (const chunk of streamSse(resp as any)) {
      yield {
        choices: [
          {
            delta: {
              content: chunk.choices[0].delta.content,
              role: "assistant",
            },
            finish_reason: chunk.finish_reason,
            index: 0,
            logprobs: null,
          },
        ],
        created: Date.now(),
        id: "",
        model: body.model,
        object: "chat.completion.chunk",
      };
    }
  }
}
