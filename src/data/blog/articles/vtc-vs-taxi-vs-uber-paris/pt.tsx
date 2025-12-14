export default function Article() {
  return (
    <article>
      <p>
        Planejando sua transferência do aeroporto em Paris e confuso sobre reservar um VTC, pegar um táxi ou usar Uber?
        Neste guia completo, compararemos as três principais opções de transporte em Paris para ajudá-lo a tomar a melhor decisão.
      </p>

      <h2>O que é VTC?</h2>
      <p>
        VTC significa "Voiture de Transport avec Chauffeur" (Veículo de Transporte com Motorista). É um serviço
        de motorista privado licenciado na França, similar aos serviços executivos de carros.
      </p>

      <h3>Características do VTC:</h3>
      <ul>
        <li>Serviço pré-reservado com preços fixos garantidos</li>
        <li>Motoristas profissionais licenciados</li>
        <li>Veículos premium (Mercedes, BMW)</li>
        <li>Serviço de recepção no aeroporto com placa</li>
        <li>Monitoramento de voo incluído sem custo extra</li>
        <li>Sem preços dinâmicos ou surpresas</li>
      </ul>

      <h2>Táxis de Paris</h2>
      <p>Os táxis tradicionais de Paris são regulamentados e têm tarifas fixas dos aeroportos.</p>

      <h3>Características dos Táxis:</h3>
      <ul>
        <li>Tarifas fixas: €50 (Margem Direita) ou €55 (Margem Esquerda)</li>
        <li>Disponíveis 24/7 em pontos de táxi</li>
        <li>Não requer reserva antecipada</li>
        <li>Pagamento em dinheiro e cartão</li>
        <li>Longas filas nos aeroportos</li>
      </ul>

      <h2>Uber e Bolt</h2>
      <p>Aplicativos de transporte com preços dinâmicos.</p>

      <h3>Características do Uber/Bolt:</h3>
      <ul>
        <li>Preço: €40-70+ (varia com demanda)</li>
        <li>Reserva por aplicativo</li>
        <li>Preços dinâmicos em horários de pico</li>
        <li>Restrições de embarque nos aeroportos</li>
        <li>Sem serviço de recepção</li>
      </ul>

      <h2>Comparação de Preços</h2>
      <div className="overflow-x-auto my-8">
        <table className="min-w-full border">
          <thead className="bg-secondary/10">
            <tr>
              <th className="border px-4 py-2 text-left">Serviço</th>
              <th className="border px-4 py-2 text-left">Preço</th>
              <th className="border px-4 py-2 text-left">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">VTC Privado</td>
              <td className="border px-4 py-2">€70-90</td>
              <td className="border px-4 py-2">Fixo garantido</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Táxi</td>
              <td className="border px-4 py-2">€50-55</td>
              <td className="border px-4 py-2">Fixo do aeroporto</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Uber/Bolt</td>
              <td className="border px-4 py-2">€40-70+</td>
              <td className="border px-4 py-2">Dinâmico (varia)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Qual Serviço Escolher?</h2>

      <h3>Escolha VTC se:</h3>
      <ul>
        <li>Você viaja com família ou grupo</li>
        <li>Tem bagagem pesada</li>
        <li>Quer preço fixo garantido</li>
        <li>Valoriza conforto e confiabilidade</li>
        <li>Seu voo pode atrasar</li>
      </ul>

      <h3>Escolha Táxi se:</h3>
      <ul>
        <li>Chega tarde da noite sem reserva</li>
        <li>Viaja sozinho com pouca bagagem</li>
        <li>Quer serviço imediato</li>
      </ul>

      <h3>Escolha Uber/Bolt se:</h3>
      <ul>
        <li>Viaja em horários fora de pico</li>
        <li>Orçamento é sua prioridade absoluta</li>
        <li>É flexível com locais de embarque</li>
      </ul>

      <h2>Conclusão</h2>
      <p>
        Para a maioria dos viajantes, especialmente famílias e grupos, um VTC privado oferece o melhor
        custo-benefício geral. O preço fixo garantido, serviço profissional, monitoramento de voo e veículos
        premium fazem com que a modesta diferença de preço valha a pena para uma experiência sem estresse.
      </p>
    </article>
  )
}
