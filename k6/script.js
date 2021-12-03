import http from 'k6/http';
import { sleep, check} from 'k6';

export default function () {
  let resB = http.get('http://localhost:4000/api/qa/:question_id/answers?question_id=3000001');
  check(resB, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes('Non et')
  });
  sleep(1);
  let resA = http.get('http://localhost:4000/api/qa/:product_id?product_id=82822');
  check(resA, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes('asker_name')
  });
  sleep(1);
  let resC = http.get('http://localhost:4000/api/qa/:answer_id/answer_photos?answer_id=154');
  check(resC, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes('url')
  });
  sleep(1);
}


