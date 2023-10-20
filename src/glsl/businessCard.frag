varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;

/**
* 2 -> 1Hash変換
*/
const float PI = 3.141592653589;
uvec3 k = uvec3(0x456789abu, 0x6789ab45u, 0x89ab4567u);
uvec3 u = uvec3(1, 2, 3);
const uint UINT_MAX = 0xffffffffu;
uint uhash11(uint n){
    n ^= (n << u.x);
    n ^= (n >> u.x);
    n *= k.x;
    n ^= (n << u.x);
    return n * k.x;
}
uvec2 uhash22(uvec2 n){
    n ^= (n.yx << u.xy);
    n ^= (n.yx >> u.xy);
    n *= k.xy;
    n ^= (n.yx << u.xy);
    return n * k.xy;
}
uvec3 uhash33(uvec3 n){
    n ^= (n.yzx << u);
    n ^= (n.yzx >> u);
    n *= k;
    n ^= (n.yzx << u);
    return n * k;
}
float hash11(float p){
    uint n = floatBitsToUint(p);
    return float(uhash11(n)) / float(UINT_MAX);
}
float hash21(vec2 p){
    uvec2 n = floatBitsToUint(p);
    return float(uhash22(n).x) / float(UINT_MAX);
}
float hash31(vec3 p){
    uvec3 n = floatBitsToUint(p);
    return float(uhash33(n).x) / float(UINT_MAX);
}
vec2 hash22(vec2 p){
    uvec2 n = floatBitsToUint(p);
    return vec2(uhash22(n)) / vec2(UINT_MAX);
}
vec3 hash33(vec3 p){
    uvec3 n = floatBitsToUint(p);
    return vec3(uhash33(n)) / vec3(UINT_MAX);
}


// 任意の１次関数を作成
float line(float x, float a, float b) {
  return x * a + b;
}

/**
* 任意のaとbから, 、colorの色を変える
*/
vec3 splitColor(
  vec2 uv,
  float a, 
  float b, 
  vec3 cola, 
  vec3 colb
){
  if (uv.y < line(uv.x, a, b)) {
    return cola;
  }
  return colb;
}

void main() {
  vec2 uv = vUv;
  float progress = uProgress;
  // 区画を[0:2]にスケール
  // uv *= 2.0;
  // uv += uTime;
  float splitNum = 1.0;
  vec3 color = vec3(0.0);
  // splitNum分だけFor文を回す
  for (float i = 0.; i <= splitNum; i += 1.) {
    float _a = hash31(vec3(i, i, 1.0));
    float _b = hash21(vec2(i, 1.0));
    vec3 _col = splitColor(
      uv, 
      _a, 
      _b + cos(progress * PI * i), 
      uColorA, 
      uColorB
    );
    color = _col;
  }

  gl_FragColor = vec4(color, 1.0);
}