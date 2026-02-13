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
    printf("<html lang='es'><head><meta charset='UTF-8'><title>Login Status</title>");
    printf("<style>");
    printf(":root { --paper: #e3dac9; --ink: #1a1a1a; --blood: #5e0000; }");
    printf("body { background-color: var(--paper); color: var(--ink); font-family: 'Courier New', monospace; text-align: center; padding: 50px; }");
    printf(".card { border: 2px solid var(--ink); padding: 40px; background: rgba(255,255,255,0.2); display: inline-block; box-shadow: 10px 10px 0 var(--blood); max-width: 400px; }");
    printf("h1 { text-transform: uppercase; border-bottom: 2px solid var(--ink); padding-bottom: 10px; }");
    printf(".btn { background: var(--ink); color: var(--paper); padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px; }");
    printf("</style>");
    printf("</head><body>");

    char *len_str = getenv("CONTENT_LENGTH");
    long len;
    char *buffer;
    char user[256] = "";
    char pass[256] = "";

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
                    char key[256], value[1024];
                    unescape_url(token, key);
                    unescape_url(eq + 1, value);
                    
                    if (strcmp(key, "identifier") == 0) strcpy(user, value);
                    if (strcmp(key, "password") == 0) strcpy(pass, value);
                }
                token = strtok(NULL, "&");
            }
            free(buffer);
        }
    }

    printf("<div class='card'>");
    // Validación simulada (en un caso real, aquí consultarías una BD o archivo)
    if (strlen(user) > 0 && strlen(pass) > 0) {
        printf("<h1>☠ Acceso Concedido ☠</h1>");
        printf("<p>Bienvenido de nuevo, <strong>%s</strong>.</p>", user);
        printf("<p>Tus pesadillas te estaban esperando.</p>");
        printf("<a href='http://localhost:5173/feed' class='btn'>ENTRAR AL FEED</a>");
    } else {
        printf("<h1>☠ Acceso Denegado ☠</h1>");
        printf("<p style='color:var(--blood);'>Credenciales inválidas o vacías.</p>");
        printf("<a href='http://localhost:5173/login' class='btn'>INTENTAR DE NUEVO</a>");
    }
    printf("</div>");

    printf("</body></html>");
    return 0;
}