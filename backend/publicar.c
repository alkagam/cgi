#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void unescape_url(char *src, char *dest) {
    char *p = src;
    char *q = dest;
    while (*p) {
        if (*p == '+') {
            *q++ = ' ';
            p++;
        } else if (*p == '%') {
            int code;
            if (sscanf(p + 1, "%2x", &code) == 1) {
                *q++ = (char)code;
                p += 3;
            } else {
                *q++ = *p++;
            }
        } else {
            *q++ = *p++;
        }
    }
    *q = '\0';
}

int main() {
    printf("Content-Type: text/html\n\n");
    
    printf("<!DOCTYPE html>");
    printf("<html lang='es'><head><meta charset='UTF-8'><title>Publicando...</title>");
    printf("<style>");
    printf(":root { --paper: #e3dac9; --ink: #1a1a1a; --blood: #5e0000; }");
    printf("body { background-color: var(--paper); color: var(--ink); font-family: 'Courier New', monospace; text-align: center; padding: 50px; }");
    printf(".card { border: 2px solid var(--ink); padding: 40px; background: rgba(255,255,255,0.2); display: inline-block; box-shadow: 10px 10px 0 var(--blood); }");
    printf("</style>");
    printf("</head><body>");

    char *len_str = getenv("CONTENT_LENGTH");
    long len;
    char *buffer;
    char content[2048] = "";

    if (len_str != NULL && (len = strtol(len_str, NULL, 10)) > 0) {
        buffer = malloc(len + 1);
        if (buffer) {
            fread(buffer, 1, len, stdin);
            buffer[len] = '\0';

            char *token = strtok(buffer, "&");
            while (token != NULL) {
                char *eq = strchr(token, '=');
                if (eq) {
                    *eq = '\0';
                    char key[256], value[2048];
                    unescape_url(token, key);
                    unescape_url(eq + 1, value);
                    
                    // Acepta 'content' o 'newPost' como nombre del campo
                    if (strcmp(key, "content") == 0 || strcmp(key, "newPost") == 0) strcpy(content, value);
                }
                token = strtok(NULL, "&");
            }
            free(buffer);
        }
    }

    printf("<div class='card'>");
    printf("<h1>Publicación Exitosa</h1>");
    printf("<p>Tu pensamiento ha sido liberado en la red:</p>");
    printf("<p style='font-style:italic; border-left: 3px solid var(--ink); padding-left:10px;'>\"%s\"</p>", content);
    printf("<br><a href='http://localhost:5173/feed' style='color:var(--blood); font-weight:bold;'>Volver</a>");
    printf("</div>");

    printf("</body></html>");
    return 0;
}