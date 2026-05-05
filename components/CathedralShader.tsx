"use client";
import { useEffect, useRef } from "react";

// Cathedral shader by xordev — color-graded to Bona Beauty warm gold/rose palette
const FRAG_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    vec3 p;
    for (float i, z, d; i++ < 5e1; o += (sin(p.y + vec4(6., 1., 2., 3.)) + 2.) / d / z)
    {
        p = z * normalize(FC.rgb * 2. - r.xyx) + t;
        z += d = length(vec2(
            length(cos(sin(.5 * p) + p).xy + 1.) - 2.,
            min(d = p.z - t + 9., d * .1) * .5
        ));
    }

    o = tanh(o / 5e1);

    // Bona Beauty color grade: dark warm → amber gold → cream highlight
    float luma = dot(o.rgb, vec3(0.299, 0.587, 0.114));
    vec3 shadows = vec3(0.11, 0.04, 0.03);
    vec3 mids    = vec3(0.79, 0.50, 0.22);
    vec3 highs   = vec3(1.00, 0.91, 0.78);
    o.rgb = mix(mix(shadows, mids, luma * 1.8), highs, pow(luma, 2.5));

    fragColor = vec4(o.rgb, 1.0);
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

export function CathedralShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
    if (!gl) return;

    let disposed = false;
    const start = performance.now();
    let frame = 0;
    const mouse = { x: 0, y: 0 };

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const uRes   = gl.getUniformLocation(prog, "iResolution");
    const uTime  = gl.getUniformLocation(prog, "iTime");
    const uFrame = gl.getUniformLocation(prog, "iFrame");
    const uMouse = gl.getUniformLocation(prog, "iMouse");

    let needsResize = true;
    const ro = new ResizeObserver(() => { needsResize = true; });
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = r.height - (e.clientY - r.top);
    };
    canvas.addEventListener("mousemove", onMove);

    const tick = (now: number) => {
      if (disposed) return;
      if (needsResize) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width  = Math.max(1, Math.floor(canvas.clientWidth  * dpr));
        canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        needsResize = false;
      }
      frame++;
      gl.useProgram(prog);
      uRes   && gl.uniform3f(uRes,   canvas.width, canvas.height, window.devicePixelRatio || 1);
      uTime  && gl.uniform1f(uTime,  (now - start) / 1000);
      uFrame && gl.uniform1i(uFrame, frame);
      uMouse && gl.uniform4f(uMouse, mouse.x, mouse.y, 0, 0);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      ro.disconnect();
      try { gl.deleteBuffer(vbo); gl.deleteVertexArray(vao); gl.deleteProgram(prog); } catch {}
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}
