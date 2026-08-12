import json
import urllib.request
import urllib.error

url = "http://localhost:3000/users"

payload = {
    "id": "",
    "name": "",
    "email": "invalid-email",
    "role": "INVALID_ROLE",
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)

try:
    with urllib.request.urlopen(req) as resp:
        print("STATUS", resp.status)
        print(resp.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("STATUS", e.code)
    print(e.read().decode("utf-8"))
except Exception as e:
    print("EXCEPTION", repr(e))
