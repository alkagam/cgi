#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mysql.h>

// Función para decodificar caracteres del navegador (%40 -> @, + -> espacio)
void decodificar(char *src) {
    char *p = src, *q = src;
    while (*p) {
        if (*p == '+') *q = ' ';
        else if (*p == '%' && p[1] && p[2]) {
            char hex[3] = {p[1], p[2], '\0'};
            *q = (char)strtol(hex, NULL, 16);
            p += 2;
        } else *q = *p;
        p++; q++;
    }
    *q = '\0';
}

// Función para extraer el valor de una llave específica en el POST_DATA
void extraer(const char *data, const char *key, char *dest) {
    char *p = strstr(data, key);
    if (p) {
        p += strlen(key) + 1; // Brincar la llave y el '='
        int i = 0;
        while (p[i] && p[i] != '&') {
            dest[i] = p[i];
            i++;
        }
        dest[i] = '\0';
        decodificar(dest);
    } else {
        strcpy(dest, ""); // Si no lo encuentra, dejar vacío
    }
}

int main() {
    // Cabecera obligatoria para CGI
    printf("Content-Type: text/html\n\n");

    // 1. Obtener la longitud de los datos enviados por React
    char *len_str = getenv("CONTENT_LENGTH");
    if (!len_str) {
        printf("Error: No se detectaron datos en el stream.");
        return 0;
    }
    
    int len = atoi(len_str);
    char *post_data = malloc(len + 1);
    fread(post_data, 1, len, stdin);
    post_data[len] = '\0';

    // 2. Variables para capturar los datos del formulario
    char nombre[100], paterno[100], materno[100], email[150], pass[100], fecha_nac[20], sexo[5];
    
    extraer(post_data, "nombre", nombre);
    extraer(post_data, "paterno", paterno);
    extraer(post_data, "materno", materno);
    extraer(post_data, "email", email);
    extraer(post_data, "password", pass);
    extraer(post_data, "fecha_nacimiento", fecha_nac);
    extraer(post_data, "sexo", sexo);

    // 3. Conexión a MariaDB
    MYSQL *conn = mysql_init(NULL);
    if (mysql_real_connect(conn, "localhost", "admin_plastic", "plastic_pass123", "plastic_memory", 0, NULL, 0)) {
        char query[2048];
        
        // Formatear el Query con los campos de tu base de datos
        // Nota: Asegúrate de que los nombres de las columnas sean idénticos a tu .sql
        sprintf(query, "INSERT INTO users (nombre, paterno, materno, email, password_hash, fecha_nacimiento, sexo) "
                       "VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')", 
                       nombre, paterno, materno, email, pass, fecha_nac, sexo);

        if (mysql_query(conn, query)) {
            printf("<h2>Error SQL: %s</h2>", mysql_error(conn));
        } else {
            printf("<div style='text-align:center; font-family:sans-serif;'>");
            printf("<h1 style='color:#8b4513;'>Sincronización de Nodo Completa</h1>");
            printf("<p>El integrante <b>%s %s</b> ha sido registrado en la base de datos.</p>", nombre, paterno);
            printf("</div>");
        }
    } else {
        printf("<h2>Falla Crítica de Conexión: %s</h2>", mysql_error(conn));
    }

    // 4. Limpieza
    mysql_close(conn);
    free(post_data);
    return 0;
}