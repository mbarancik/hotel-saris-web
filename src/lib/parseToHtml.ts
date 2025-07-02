interface ContentNode {
	type: string;
	text?: string;
	value?: string;
	url?: string;
	title?: string;
	bold?: boolean;
	italic?: boolean;
	strikethrough?: boolean;
	underline?: boolean;
	code?: boolean;
	children?: ContentNode[];
}

export default function parseContentToHtml(content: ContentNode): string {
	function parseNode(node: ContentNode): string {
		if (!node || !node.type) {
			return '';
		}

		// Handle root node
		if (node.type === 'root') {
			return node.children?.map(parseNode).join('') || '';
		}

		// Handle text nodes
		if (node.type === 'text') {
			let { text } = node;

			// Escape HTML characters
			text = text?.replace(/</g, '&lt;').replace(/>/g, '&gt;');

			// Parse markdown-style formatting first
			// Parse **bold** text (before single asterisks)
			text = text?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
			// Parse *italic* text
			text = text?.replace(/\*(.*?)\*/g, '<em>$1</em>');

			// Apply node formatting properties
			if (node.bold) {
				text = `<strong>${text}</strong>`;
			}
			if (node.italic) {
				text = `<em>${text}</em>`;
			}
			if (node.strikethrough) {
				text = `<del>${text}</del>`;
			}
			if (node.underline) {
				text = `<u>${text}</u>`;
			}
			if (node.code) {
				text = `<code>${text}</code>`;
			}

			return text || '';
		}

		// Handle link nodes
		if (node.type === 'a') {
			const href = node.url || '#';
			const title = node.title ? ` title="${node.title}"` : '';
			const children = node.children?.map(parseNode).join('') || '';
			return `<a href="${href}"${title}>${children}</a>`;
		}

		// Handle list item content (lic)
		if (node.type === 'lic') {
			return node.children?.map(parseNode).join('') || '';
		}

		// Handle all other HTML elements
		const validTags = [
			'p',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'ul',
			'ol',
			'li',
			'strong',
			'em',
			'code',
			'pre',
			'blockquote',
			'br'
		];

		if (validTags.includes(node.type)) {
			const children = node.children?.map(parseNode).join('') || '';
			return `<${node.type}>${children}</${node.type}>`;
		}

		// Handle code blocks
		if (node.type === 'code_block') {
			return `<pre><code>${node.value || ''}</code></pre>`;
		}

		// Handle raw HTML
		if (node.type === 'html') {
			return node.value || '';
		}

		// Fallback for unknown nodes - just process children
		return node.children?.map(parseNode).join('') || '';
	}

	return parseNode(content);
}
