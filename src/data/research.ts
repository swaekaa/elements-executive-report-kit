import type { ResearchReportData } from './types';

export const researchReportData: ResearchReportData = {
  organization: 'Apex Research Labs',
  title: 'Evaluating Transformer Architectures for Low-Resource Text Classification',
  subtitle: 'A comparative study of fine-tuning strategies and model efficiency',
  date: 'December 2024',
  author: 'Dr. Alex Kim, Research Lead',
  version: '1.0',

  abstract:
    'This study evaluates the effectiveness of various transformer-based architectures for text classification tasks in low-resource settings. We compare fine-tuning strategies across five model families using three domain-specific datasets with limited labeled examples. Our findings demonstrate that parameter-efficient fine-tuning methods achieve comparable performance to full fine-tuning while reducing computational requirements by up to 85%. We introduce a novel adapter-based approach that outperforms existing methods on two of three benchmarks, achieving state-of-the-art results with fewer than 1,000 labeled examples.',

  objective:
    'To identify the most effective and efficient transformer fine-tuning strategy for text classification in scenarios where labeled training data is scarce (fewer than 1,000 examples per class), and to develop a practical framework for practitioners working with domain-specific classification tasks.',

  dataset: {
    name: 'Multi-Domain Low-Resource Benchmark (MDLR-3)',
    size: '4,500 labeled examples across 3 domains',
    source: 'Curated from publicly available domain-specific corpora',
    description:
      'Three domain-specific datasets: medical abstracts (1,500 samples, 5 classes), legal documents (1,500 samples, 4 classes), and technical support tickets (1,500 samples, 6 classes). Each dataset is split 60/20/20 for train/validation/test.',
  },

  methodology: [
    'Baseline establishment using traditional ML methods (SVM, Random Forest) with TF-IDF features.',
    'Full fine-tuning of five transformer models: BERT-base, RoBERTa-base, DeBERTa-v3, ALBERT-v2, and DistilBERT.',
    'Parameter-efficient fine-tuning using LoRA, prefix tuning, and adapter modules.',
    'Novel hybrid adapter approach combining task-specific and domain-specific adapters.',
    'Evaluation using 5-fold cross-validation with macro F1-score as the primary metric.',
    'Statistical significance testing using paired bootstrap resampling (n=10,000).',
  ],

  metrics: [
    { name: 'BERT-base (Full FT)', value: 84.2, unit: 'F1' },
    { name: 'RoBERTa (Full FT)', value: 86.7, unit: 'F1' },
    { name: 'DeBERTa-v3 (Full FT)', value: 87.9, unit: 'F1' },
    { name: 'DeBERTa-v3 (LoRA)', value: 87.1, unit: 'F1' },
    { name: 'Hybrid Adapter (Ours)', value: 88.4, unit: 'F1' },
    { name: 'DistilBERT (Full FT)', value: 82.1, unit: 'F1' },
  ],

  results:
    'Our hybrid adapter approach achieved the highest macro F1-score of 88.4% across all three domains, outperforming full fine-tuning of DeBERTa-v3 (87.9%) while using only 15% of trainable parameters. The improvement is statistically significant on the medical and legal domains (p < 0.05) but not on the technical support domain (p = 0.12). Parameter-efficient methods consistently achieved within 1.5 F1 points of full fine-tuning across all models, with LoRA showing the best efficiency-performance tradeoff among existing methods. Training time was reduced by 73% on average when using adapter-based approaches.',

  chartData: [
    { label: 'BERT-base', value: 84.2, maxValue: 100 },
    { label: 'DistilBERT', value: 82.1, maxValue: 100 },
    { label: 'RoBERTa', value: 86.7, maxValue: 100 },
    { label: 'DeBERTa-v3', value: 87.9, maxValue: 100 },
    { label: 'DeBERTa (LoRA)', value: 87.1, maxValue: 100 },
    { label: 'Hybrid (Ours)', value: 88.4, maxValue: 100, color: '#16A34A' },
  ],

  discussion:
    'The strong performance of parameter-efficient methods in low-resource settings has significant practical implications. Organizations with limited computational budgets and scarce labeled data can achieve near-state-of-the-art results without the cost of full model fine-tuning. Our hybrid adapter approach shows particular promise because it separates domain knowledge from task knowledge, allowing adapters to be reused across related tasks within the same domain. One limitation of this study is the focus on English-language datasets; cross-lingual transfer performance remains an open question.',

  futureWork: [
    'Extend evaluation to multilingual and cross-lingual low-resource scenarios.',
    'Investigate the combination of hybrid adapters with few-shot prompting strategies.',
    'Develop automated adapter selection mechanisms based on task characteristics.',
    'Scale experiments to larger model families (7B+ parameters) to assess efficiency gains.',
    'Create an open-source toolkit for practitioners to apply these methods in production settings.',
  ],

  references: [
    { id: '1', text: 'Devlin, J. et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers.' },
    { id: '2', text: 'Hu, E. et al. (2022). LoRA: Low-Rank Adaptation of Large Language Models.' },
    { id: '3', text: 'He, P. et al. (2023). DeBERTaV3: Improving DeBERTa using ELECTRA-Style Pre-Training.' },
    { id: '4', text: 'Houlsby, N. et al. (2019). Parameter-Efficient Transfer Learning for NLP.' },
    { id: '5', text: 'Liu, Y. et al. (2019). RoBERTa: A Robustly Optimized BERT Pretraining Approach.' },
  ],

  footerText: '© 2024 Apex Research Labs. All rights reserved.',
};
