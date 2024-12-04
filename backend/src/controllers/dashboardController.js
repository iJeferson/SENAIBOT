const { Op, Sequelize } = require('sequelize');
const { busca_inpi } = require('../models'); // Ajuste o caminho se necessário

const dashboard = {
  /**
   * Retorna um resumo do dashboard filtrado por termo de pesquisa.
   */
  async obterDadosDoDashboard(req, res) {
    try {
      const { termo } = req.query; // Termo de pesquisa fornecido via query string

      // Condição de busca dinâmica com base no termo
      const whereCondition = termo
        ? {
            [Op.or]: [
              { titulo: { [Op.like]: `%${termo}%` } },
              { pedido: { [Op.like]: `%${termo}%` } },
              { ipc: { [Op.like]: `%${termo}%` } }
            ]
          }
        : {};

      // Sugestões para o dashboard (total, top IPCs, patentes recentes)
      const totalPatentes = await busca_inpi.count({ where: whereCondition });

      // Top IPCs sem limite (retorna todos os IPCs)
      const topIPCs = await busca_inpi.findAll({
        attributes: [
          'ipc',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'quantidade']
        ],
        where: whereCondition,
        group: ['ipc'],
        order: [[Sequelize.literal('quantidade'), 'DESC']] // Ordenar do mais frequente para o menos frequente
      });

      // Patentes recentes com limite de 5 e ordenação pela data de depósito (mais recente para mais antigo)
      const patentesRecentes = await busca_inpi.findAll({
        attributes: [
          'pedido',
          'titulo',
          'deposito',
          'ipc'
        ],
        where: whereCondition,
        order: [
          [Sequelize.fn('STR_TO_DATE', Sequelize.col('deposito'), '%d/%m/%Y'), 'DESC'] // Converte o campo 'deposito' de string para data
        ],
        limit: 5 // Limite de 5 resultados para patentes recentes
      });

      // Quantidade de patentes por ano (agrupadas por ano de depósito)
      const patentesPorAno = await busca_inpi.findAll({
        attributes: [
          [Sequelize.fn('YEAR', Sequelize.fn('STR_TO_DATE', Sequelize.col('deposito'), '%d/%m/%Y')), 'ano'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'quantidade']
        ],
        where: whereCondition,
        group: ['ano'],
        order: [[Sequelize.literal('ano'), 'DESC']] // Ordena do ano mais recente para o mais antigo
      });

      // Retornar o JSON consolidado
      return res.json({
        resumo: {
          totalPatentes,
          topIPCs,
          patentesRecentes,
          patentesPorAno
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar dados do dashboard.' });
    }
  }
};

module.exports = dashboard;
