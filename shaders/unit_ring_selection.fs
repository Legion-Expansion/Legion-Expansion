#version 140

// unit_ring_selection.fs
uniform vec4 Time;

in vec4 v_Color;
in vec2 v_TexCoord;
in float v_PixelScale;

out vec4 out_FragColor;

void main()
{
    float color_b = abs(v_Color.b);

    float black_edge_pixel_width = 2.0;

    float ring_thickness_base = mix(0.1, 0.03, clamp(color_b / 80.0, 0.0, 1.0));

    vec2 dxy = 2.0 * v_TexCoord.xy - 1.0;

    float d = sqrt(dot(dxy, dxy));

    vec3 ring_color1 = vec3(0.0, 0.702, 1.0);
    vec3 ring_color2 = vec3(0.0, 0.702, 1.0);

    // this is the new bit, test to see if the selection circle size is negative
    // then use a new formula for computing the distance field value d
    if (v_Color.b < 0) {
        float pi = 3.1415926535;

        ring_color1 = vec3(1, 0, 0);
        ring_color2 = vec3(1, 0.15, 0.1);

        float x = dxy.x;
        float y = dxy.y;

        float px = cos(pi / 3);
        float py = sin(pi / 3);

        float angle = atan(y, x);

        int domain = int((angle + pi) / (pi / 3)) % 3;

        vec2 dir1 = vec2(px, py) + vec2(1, 0);
        vec2 dir2 = vec2(px, -py) + vec2(1, 0);

        if (domain == 0) {
            d = abs(dot(dxy, normalize(dir1))) / py;
        }

        if (domain == 1) {
            d = abs(y) / py;
        }

        if (domain == 2) {
            d = abs(dot(dxy, normalize(dir2))) / py;
        }
    }

    float radius_in_pixels = 1.0 / (v_PixelScale / (color_b * 0.5 + 2.0 * v_PixelScale));
    float pixel_d = clamp(1.0 - d, 0.0, 1.0) * radius_in_pixels;

    float black_edge = clamp(pixel_d - black_edge_pixel_width, 0.0, 1.0);
    float outside_ring_edge = clamp(pixel_d / black_edge_pixel_width, 0.0, 1.0);
    float inside_ring_edge = 1.0 - smoothstep(0.0, 1.0, ((pixel_d - black_edge_pixel_width - max(2.0, radius_in_pixels * ring_thickness_base)) + 0.5) * 0.25);
    float inside_falloff = smoothstep(0.0, 1.0, (pixel_d - black_edge_pixel_width) / (radius_in_pixels * 0.45));

    float alpha = mix(0.25, 1.0, black_edge) * outside_ring_edge * mix(pow(1.0 - inside_falloff, 4.0) * 0.5, 1.0, inside_ring_edge) * 0.8;
    vec3 color = mix(vec3(0.0), ring_color1, black_edge);
    color = mix(color, ring_color2, inside_falloff);
    out_FragColor = vec4(color, alpha);
}

