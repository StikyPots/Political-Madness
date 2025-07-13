import {ContainerGuiObject} from "../ContainerGuiObject";
import {Vector2} from "../Vector2";
import {GuiObject} from "../GuiObject";

export class Table extends ContainerGuiObject {

    protected _absolutePosition: Vector2;
    protected _position: Vector2;
    protected children: GuiObject[];
    private rows: GuiObject[][];
    public size: Vector2;
    private _padding: Vector2 = new Vector2(50, 50)

    constructor(position: Vector2, rows: GuiObject[][]) {
        super();

        this._absolutePosition = position;
        this._position = position;
        this.size = new Vector2();
        this.rows = rows;
        this.children = [];

        for (const row of rows) {
            for (const cell of row) {
                this.addChild(cell)
            }
        }

        this.calculateLayout();

    }


    public addRow(cells: GuiObject[]) {
        this.rows.push(cells);

        for (const cell of cells) {
            super.addChild(cell);
        }

        this.calculateLayout();
    }

    public override update(dt: number) {
    }

    private calculateLayout() {
        const rowCount = this.rows.length;
        const columnCount = Math.max(...this.rows.map(r => r.length), 0);

        const columnWidths: number[] = [];
        for (let c = 0; c < columnCount; c++) {
            columnWidths[c] = 0;
        }

        const rowHeights: number[] = [];
        for (let r = 0; r < rowCount; r++) {
            rowHeights[r] = 0;
        }


        for (let r = 0; r < rowCount; r++) {
            const row: GuiObject[] = this.rows[r];
            for (let c = 0; c < row.length; c++) {
                const cell: GuiObject = row[c];
                columnWidths[c] = Math.max(columnWidths[c], cell.size.getX());
                rowHeights[r] = Math.max(rowHeights[r], cell.size.getY());
            }
        }

        let yOffset = 0;

        for (let r = 0; r < rowCount; r++) {
            const row: GuiObject[] = this.rows[r];
            let xOffset = 0;

            for (let c = 0; c < row.length; c++) {
                const cell:GuiObject = row[c];
                cell.position = new Vector2(xOffset, yOffset);
                xOffset += columnWidths[c] + this._padding.getX();
            }
            yOffset += rowHeights[r] + this._padding.getY();
        }

        const totalWidth = columnWidths.reduce((sum, w) => sum + w, 0)
        + Math.max(0, columnCount - 1) * this._padding.getX();

        const totalHeight = rowHeights.reduce((sum, h) => sum + h, 0)
            + Math.max(0, rowCount - 1) * this._padding.getY();

        this.size = new Vector2(totalWidth, totalHeight);
    }

    public set padding(v: Vector2) {
        this._padding = v;
        this.calculateLayout()
    }

    public get padding(): Vector2 {
        return this._padding;
    }
}