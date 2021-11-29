import { sleep, group } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
  stages: [
    { target: 20, duration: "1m" },
    { target: 20, duration: "3m30s" },
    { target: 0, duration: "1m" },
  ],
  thresholds: {},
};

export default function main() {
  let response;

  group("sample get calls for q&a data - ^^^", function () {
    // questions
    response = http.get(
      "http://localhost:4000/api/qa/questions?product_id=44388&reported=false",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // answers
    response = http.get(
      "http://localhost:4000/api/qa/answers?question_id=36&reported=false",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // answer_photos
    response = http.get(
      "http://localhost:4000/api/qa/answer_photos?answer_id=5",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  // Automatically added sleep
  sleep(1);
}