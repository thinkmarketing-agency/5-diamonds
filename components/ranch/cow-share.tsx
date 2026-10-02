"use client";
import { useId } from "react";

export function CowShare({ share }: { share: number }) {
  const clip = useId();
  // Vector tracing of the supplied outline, mirrored to face right.
  const outline = "M62 202 Q61 195 72 190 L87 176 L100 161 Q103 153 110 146 L120 136 L114 126 Q111 116 118 121 L126 125 Q136 126 125 116 Q120 109 126 112 Q140 120 148 132 Q154 130 159 143 L182 157 Q221 159 260 170 Q288 176 309 177 L350 174 Q380 170 411 160 Q438 151 453 160 Q478 174 479 195 L479 221 L482 244 Q486 263 484 281 L485 301 Q491 317 487 329 L483 326 L484 350 L484 380 Q486 396 473 397 Q459 398 462 391 Q470 381 469 359 L463 341 Q455 353 456 370 Q456 390 448 394 Q429 398 435 387 Q449 369 444 345 Q443 326 434 319 L411 298 Q406 292 399 297 Q380 311 360 312 L331 313 Q311 307 294 310 Q276 314 256 310 Q242 306 242 317 L241 342 L235 384 Q235 397 230 397 Q213 396 218 389 L222 381 L222 358 L220 333 L216 362 L210 390 Q209 397 198 395 Q191 395 197 386 Q205 373 203 352 L199 332 Q199 323 190 321 Q180 316 175 305 L165 295 Q160 291 159 278 L153 254 L143 220 Q149 206 139 214 Q128 222 101 220 Q78 222 66 214 Q60 210 62 202 Z";
  return (
    <svg className="cowShare" viewBox="45 100 460 310" role="img" aria-label={`Right-facing cow outline filled ${share}% from left to right`}>
      <g transform="translate(550 0) scale(-1 1)">
        <defs><clipPath id={clip}><path d={outline} /></clipPath></defs>
        <path d={outline} fill="#ffffff08" />
        <g clipPath={`url(#${clip})`}>
          <rect className="cowFill" x={490 - 430 * share / 100} y="100" width={430 * share / 100} height="310" fill="currentColor" />
        </g>
        <path d={outline} fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M479 239 Q481 263 477 283 L477 299 Q469 290 473 263" fill="none" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
